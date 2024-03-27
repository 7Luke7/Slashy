const { make_order } = require("../cj_product_controller")

const processPayment = (req, res, next) => {
    try {

        
        // make_order(req.body, res, next)
    } catch (error) {
        next(error)
    }
}

module.exports = {processPayment}