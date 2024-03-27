const paymentError = (err, req, res, next) => {

    if (err.status !== 402) {
        return next(err)
    }

    return res.status(err.status).json({
        message: err.message,
        status: err.status
    })
}

const globalError = (err, req, res, next) => {
    if (err.reason) {
        return res.status(400).json({
            message: "Please provide valid credentials.",
            status: 400
        })
    }
    return res.status(err.status).json({
        message: err.message,
        status: err.status
    })
}

module.exports = {
    globalError,
    paymentError
}