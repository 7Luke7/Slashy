require("dotenv").config()
const CJClient = require("./cj_authentication/cj_authentication");
const crypto = require("node:crypto");
const exntendedError = require("./errors/ExtendedError");

const make_order = async (req, res, next) => {
    try {
        const target_product = req.body
        const orderNumber = crypto.randomBytes(20).toString('hex');
        const RATE_LIMIT_TIME_WINDOW = 10000;
        let lastRequestTime = 0;

        if (Date.now() - lastRequestTime < RATE_LIMIT_TIME_WINDOW) {
            throw new exntendedError("Please wait before making another request.", 429);
        }

        lastRequestTime = Date.now();

        if (currentTime - lastRequestTime < RATE_LIMIT_TIME_WINDOW) {
            requestCount++;
            if (requestCount > MAX_REQUESTS_PER_WINDOW) {
                throw new exntendedError("Too many requests. Please try again later.", 429);
            }
        }

        if (req.session.order_id) {
            const delete_order_request = await new CJClient().createRequest(`https://developers.cjdropshipping.com/api2.0/v1/shopping/order/deleteOrder?orderId=${req.session.order_id}`, "DELETE")

            if (delete_order_request.status === "failed") {
                throw new exntendedError("Failed creating order.", 500)
            }

            req.session.destroy()
        }

        const make_order_request = await new CJClient().createRequest("https://developers.cjdropshipping.com/api2.0/v1/shopping/order/createOrder", "POST", {orderNumber: orderNumber, ...target_product})

        if (make_order_request.status === "failed") {
            throw new exntendedError("Failed creating order.", 500)
        }

        req.session.order_id = make_order_request.data
        const dayinms = 86400000;
        req.session.cookie.maxAge = dayinms;

        res.status(200).json({data: make_order_request.data})
    } catch (error) {
        next(error)
    }
}

const delete_order = async (req, res, next) => {
    try {
        if (!req.session.order_id) {
            throw new exntendedError("Payment Session Expired.", 400)
        }
        const delete_order_request = await new CJClient().createRequest(`https://developers.cjdropshipping.com/api2.0/v1/shopping/order/deleteOrder?orderId=${req.session.order_id}`, "DELETE")

        if (delete_order_request.status === "failed") {
            throw new exntendedError("Failed creating order.", 500)
        }

        req.session.destroy()

        res.status(200).json(delete_order_request)
    } catch (error) {
        next(error)
    }
}

const get_variant = async (req, res, next) => {
    try {  
        if (!req.session.order_id) {
            throw new exntendedError("Payment Session Expired.", 400)
        }
        const make_order_request = await new CJClient().createRequest(`https://developers.cjdropshipping.com/api2.0/v1/product/variant/queryByVid?vid=${req.params.id}`, "GET")

        if (make_order_request.status === "failed") {
            throw new exntendedError("Failed creating order.", 500)
        }

        make_order_request.data.variantSellPrice = (Number(make_order_request.data.variantSellPrice) * 1.31)
        
        res.status(200).json(make_order_request.data)
    } catch (error) {
        next(error)
    }
}

const query_order = async (req, res, next) => {
    try {   
        if (!req.session.order_id) {
            throw new exntendedError("Payment Session Expired.", 400)
        }
        const order_id = req.session.order_id

        const query_order_request = await new CJClient().createRequest(`https://developers.cjdropshipping.com/api2.0/v1/shopping/order/getOrderDetail?orderId=${order_id}`, "GET")

        if (query_order_request.status === "failed") {
            throw new exntendedError("Failed while quering order", 500)
        }

        let other_expenses = 0
        if (Number(query_order_request.data.productAmount) + Number(query_order_request.data.postageAmount) < Number(query_order_request.data.orderAmount)) {
            other_expenses = Number(query_order_request.data.orderAmount) - (Number(query_order_request.data.productAmount) + Number(query_order_request.data.postageAmount))
        } 

        query_order_request.data.productList[0].sellPrice = (Number(query_order_request.data.productList[0].sellPrice) * 1.31) * query_order_request.data.productList[0].quantity
        query_order_request.data.productAmount = query_order_request.data.productList[0].sellPrice
        query_order_request.data.postageAmount = (Number(query_order_request.data.postageAmount) * 1.19)

        query_order_request.data.orderAmount = Number(Number(query_order_request.data.productAmount) + Number(query_order_request.data.postageAmount) + other_expenses).toFixed(2)

        res.status(200).json(query_order_request.data)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    make_order,
    query_order,
    get_variant,
    delete_order
}