require("dotenv").config()
const CJClient = require("./cj_authentication/cj_authentication");
const crypto = require("node:crypto");
const exntendedError = require("./errors/ExtendedError");

const make_order = async (target_product, res, next) => {
    try {
        const randomString = crypto.randomBytes(20).toString('hex');
        
        const make_order_request = await new CJClient().createRequest("https://developers.cjdropshipping.com/api2.0/v1/shopping/order/createOrder", "POST", {orderNumber: randomString, ...target_product})

        if (make_order_request.status === "failed") {
            throw new exntendedError("Failed while creating order.", 500)
        }
        query_order(make_order_request.data, res, next)
    } catch (error) {
        next(error)
    }
}

const query_order = async (orderNumber, res, next) => {
    try {   
        const query_order_request = await new CJClient().createRequest(`https://developers.cjdropshipping.com/api2.0/v1/shopping/order/getOrderDetail?orderId=${orderNumber}`, "GET")

        if (query_order_request.status === "failed") {
            throw new exntendedError("Failed while searching for order.", 500)
        }

        confirm_order(query_order_request.data.orderId, res, next)        
    } catch (error) {
        next(error)
    }
}

const confirm_order = async (orderId, res, next) => {
    try {
        const confirm_request = await new CJClient().createRequest("https://developers.cjdropshipping.com/api2.0/v1/shopping/order/confirmOrder", "PATCH", {
            orderId: orderId
        })

        if (confirm_request.status === "failed") {
            throw new exntendedError("Failed while confirming order.", 500)
        }

        res.status(200).json({message: "Successfully Ordered. Thanks for choosing us."})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    make_order
}