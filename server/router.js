const router = require("express").Router()
const { make_order, query_order, get_variant, delete_order } = require("./cj_product_controller");
const { Purchase } = require("./models/model");
const {captureOrder, createOrder} = require("./payments/processPayment")

router.post("/make_cj_order", make_order)
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
      const { orderID, cj_order } = req.params;
      const { jsonResponse, httpStatusCode } = await captureOrder(orderID);

      const new_purchase = new Purchase({...jsonResponse, ...cj_order})
      await new_purchase.save()

      res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Server error. try again." });
    }
  });

module.exports = router