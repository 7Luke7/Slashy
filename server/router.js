const router = require("express").Router()
const { default: rateLimit } = require("express-rate-limit");
const { make_order, query_order, get_variant, delete_order, payment_and_order } = require("./cj_product_controller");
const { Purchase, Affiliate } = require("./models/model");
const {captureOrder, createOrder, withdraw_funds} = require("./payments/processPayment");
const { sign_up, verify_affiliate, sign_in } = require("./affiliate/authentication");
const {get_affiliate, logout, verify_code, get_code, delete_affiliate_link, reset_password, add_affiliate_product} = require("./affiliate/dashboard");

const limiter = rateLimit({
	windowMs: 5000,
	limit: 1,
  message: "Your request limit has been reached. try again after 5 seconds.",
	standardHeaders: 'draft-7',
	legacyHeaders: false,
  skipSuccessfulRequests: true
})
const limit_codes = rateLimit({
	windowMs: 3 * 60 * 1000,
	limit: 1,
  message: "Your request limit has been reached. try again after 3 minutes.",
	standardHeaders: 'draft-7',
	legacyHeaders: false,
  skipSuccessfulRequests: true
})
const limit_submissions = rateLimit({
	windowMs: 3000,
	limit: 2,
  message: "Your request limit has been reached. try again after 3 seconds.",
	standardHeaders: 'draft-7',
	legacyHeaders: false,
  skipSuccessfulRequests: true
})

router.get("/get_affiliate", verify_affiliate, get_affiliate)
router.get("/verify_affiliate", verify_affiliate, (req, res, next) => {
  res.status(200).json({message: "is affiliate"})
})
router.post("/withdraw", limit_submissions, verify_affiliate, withdraw_funds)
router.delete("/delete_affiliateLink/:id", verify_affiliate, delete_affiliate_link)
router.post("/add_affiliate_product", limit_submissions, verify_affiliate, add_affiliate_product)
router.get("/get_code", limit_codes, verify_affiliate, get_code)
router.post("/verify_code", limit_submissions, verify_affiliate, verify_code)
router.post("/reset_password", limit_submissions, verify_affiliate, reset_password)
router.delete("/logout", logout)
router.post("/login_user", sign_in)
router.post("/sign_up", sign_up)
router.get("/payment/:id", payment_and_order)
router.post("/make_cj_order", limiter, make_order)
router.delete("/delete_order/:id", limiter, delete_order)
router.get("/query_order/:id", query_order)
router.get("/get_variant/:id", get_variant)
router.post("/orders", async (req, res) => {
    try {
      const { cost } = req.body;
      const { jsonResponse, httpStatusCode } = await createOrder(cost);

      res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Server error. try again." });
    }
  });

router.post("/payment/capture", async (req, res) => {
    try {
      const { orderID, cj_order, affiliate_link } = req.body;
      const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
      
      const affiliate_id = affiliate_link.split("affiliate=")[1]
      const affiliate = await Affiliate.findById(affiliate_id)
      const productLink = `${process.env.URL}/product/${cj_order.pid}?affiliate=${affiliate_id}`

      if (affiliate) {
        const link = affiliate.affiliateLinks.find((l) => l.link === productLink)
        const commision = Number(cj_order.productAmount) * 0.25
        affiliate.itemSold.push({
          pid: cj_order.pid,
          variantImage: cj_order.variantImage,
          comissionAmmount: commision,
          createTime: cj_order.createDate,
          link: productLink
        })
        link.earning += commision
        affiliate.amount += commision
        await affiliate.save()
      }
      const new_purchase = new Purchase({...jsonResponse, cj_order: cj_order})
      await new_purchase.save()

      res.status(httpStatusCode).json({purchase_id: new_purchase._id});
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Server error. try again." });
    }
  });

module.exports = router