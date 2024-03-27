const router = require("express").Router()
const {processPayment} = require("./payments/processPayment")

router.post("/processPayment", processPayment)

module.exports = router