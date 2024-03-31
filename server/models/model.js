const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    vid: String,
    pid: String,
    variantNameEn: String,
    variantImage: String,
    variantSku: String,
    variantUnit: String,
    variantProperty: String,
    variantKey: String,
    variantLength: Number,
    variantWidth: Number,
    variantHeight: Number,
    variantVolume: Number,
    variantWeight: Number,
    variantSellPrice: Number,
    createTime: Date,
    variantStandard: String,
    variantSugSellPrice: Number
});

const product_object = new mongoose.Schema({
    vid: String,
    quantity: Number,
    sellPrice: Number
})

const orderSchema = new mongoose.Schema({
    orderId: String,
    orderNum: String,
    cjOrderId: String,
    cjOrderCode: String,
    shippingCountryCode: String,
    shippingProvince: String,
    shippingCity: String,
    shippingPhone: String,
    shippingAddress: String,
    shippingCustomerName: String,
    remark: String,
    orderWeight: Number,
    orderStatus: String,
    orderAmount: Number,
    productAmount: Number,
    postageAmount: Number,
    logisticName: String,
    trackNumber: String,
    createDate: Date,
    paymentDate: Date,
    productList: [product_object],
    variant: productSchema
});

const AddressSchema = new mongoose.Schema({
    address_line_1: String,
    admin_area_2: String,
    admin_area_1: String,
    postal_code: String,
    country_code: String
});

const CaptureSchema = new mongoose.Schema({
    id: String,
    status: String,
    amount: {
        currency_code: String,
        value: String
    },
    final_capture: Boolean,
    create_time: Date,
    update_time: Date
});

const PurchaseUnitSchema = new mongoose.Schema({
    reference_id: String,
    shipping: {
        name: {
            full_name: String
        },
        address: AddressSchema
    },
    payments: {
        captures: [CaptureSchema]
    }
});

const PayerSchema = new mongoose.Schema({
    name: {
        given_name: String,
        surname: String
    },
    email_address: String,
    payer_id: String,
    address: {
        country_code: String
    }
});

const PaymentSourceSchema = new mongoose.Schema({
    paypal: {
        email_address: String,
        account_id: String,
        account_status: String,
        name: {
            given_name: String,
            surname: String
        },
        address: {
            country_code: String
        }
    }
});

const PayPalPaymentSchema = new mongoose.Schema({
    status: String,
    payment_source: PaymentSourceSchema,
    purchase_units: [PurchaseUnitSchema],
    payer: PayerSchema,
    links: [{
        href: String,
        rel: String,
        method: String
    }],
    cj_order: orderSchema
});

const Purchase = mongoose.model("Purchase", PayPalPaymentSchema)

module.exports = {
    Purchase,
}