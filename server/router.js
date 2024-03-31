const router = require("express").Router()
const { default: rateLimit } = require("express-rate-limit");
const { make_order, query_order, get_variant, delete_order, payment_and_order } = require("./cj_product_controller");
const { Purchase } = require("./models/model");
const {captureOrder, createOrder} = require("./payments/processPayment")

const limiter = rateLimit({
	windowMs: 10000,
	limit: 1,
  message: "Your 1 request per 10 second limit has been reached. try again.",
	standardHeaders: 'draft-7',
	legacyHeaders: false,
})
router.get("/payment/:id", payment_and_order)
router.post("/make_cj_order", limiter, make_order)
router.delete("/delete_order/:id", delete_order)
router.get("/query_order", query_order)
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
      const { orderID, cj_order } = req.body;
      const { jsonResponse, httpStatusCode } = await captureOrder(orderID);

      const new_purchase = new Purchase({...jsonResponse, cj_order: cj_order})
      await new_purchase.save()

      res.status(httpStatusCode).json({purchase_id: new_purchase._id});
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Server error. try again." });
    }
  });

module.exports = router