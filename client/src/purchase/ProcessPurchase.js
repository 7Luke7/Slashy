import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";
import loading from "../public/loading-loader.svg"

const ProcessPurchase = () => {   
    const [order, setOrder] = useState()
    const [globalLoading, setGlobalLoading] = useState()
    const [variant, setVariant] = useState()
    const [orderRemoved, setOrderRemoved] = useState(false)
    const [paymentSessionExpired, setPaymentSessionExpired] = useState()
    const [majorError, setMajorError] = useState()

    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = "Slashy - Process Payment"
        setGlobalLoading(true)
        
        const query_order = async () => {
            try {
                const query_order_request = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/query_order/${id}`, {
                    method: "GET",
                    cache: "no-store",
                })

                const data = await query_order_request.json()

                if (!query_order_request.ok) {
                    throw new Error("Failed while quering order")
                }

                if (data.status === 400) {
                    throw new Error(data.status)
                }

                setOrder(data)
            } catch (error) {
                setGlobalLoading(false)
                if (Number(error.message) === 400) {
                    return setPaymentSessionExpired(true)
                }
                setMajorError(true)
            }
        }

        query_order()
    }, [id])

    useEffect(() => {
        if (!order) {
            return
        }
        
        const get_variant = async () => {
            const vid = order && order.productList && order.productList[0].vid
            try {
                const query_order_request = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/get_variant/${vid}`, {
                    method: "GET",
                    cache: "no-store",
                })

                if (!query_order_request.ok) {
                    throw new Error("Server error occured")
                }

                const data = await query_order_request.json()

                data.variantSellPrice = order.productAmount
                setVariant(data)
                setGlobalLoading(false)
            } catch (error) {
                setGlobalLoading(false)
                alert(error.message)
            }
        }

        get_variant()
    }, [order])

    const createOrder = async (data) => {
        try {
            const request = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cost: order.orderAmount,
                }),
            })
            
            const data = await request.json()

            return data.id
        } catch (error) {
            alert("Error while creating payment for order.")
        }
    };

    const onApprove = async (data) => {
        try {
            const request = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/payment/capture`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cj_order: {...variant, ...order},
                    orderID: data.orderID
                }),
            })
            const response_data = await request.json()

            navigate(`/payment/${response_data.purchase_id}`)
        } catch (error) {
            alert("Error while approving payment.")
        }
    };
    
    const remove_order = async () => {
        if (!order) {
            return
        } 
        try {
            const delete_order_request = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/delete_order/${order.orderId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            })

            if (!delete_order_request.ok) {
                throw new Error("Server error occured")
            }

            const data = await delete_order_request.json()

            if (data.status === "success") {
                setOrderRemoved(true)
            } else {
                alert("Something went wrong while removing order")
            }
        } catch (error) {
            alert(error.message)
        }
    }
    const render = useMemo(() => {
        if (majorError) {
            return <>
                <Header></Header>
                <div className="min-h-[70vh] flex items-center justify-center">
                    <div className="flex flex-col items-center space-y-2">
                        <p>Failed while quering for Order, it might be removed.</p>
                        <a href="/" className="rounded py-1 px-2 bg-[#fd5702]">Go to Home page</a>
                    </div>
                </div>
                <Footer></Footer>
            </>
        }
        if (globalLoading) {
            return  <div className="bg-gray-100 w-full flex items-center min-h-screen justify-center">
                <img className="animate-spin" src={loading}></img>
            </div>
        } else if (orderRemoved) {
            return <>
                <Header></Header>
                <div className="min-h-[70vh] flex items-center justify-center">
                    <div className="flex flex-col items-center space-y-2">
                        <p>Order removed.</p>
                        <a href="/purchase" className="rounded py-1 px-2 bg-[#fd5702]">Go to purchase</a>
                    </div>
                </div>
                <Footer></Footer>
            </>
        } else if(variant || order && !orderRemoved) {
            const initialOptions = {
                clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
                currency: "USD",
                intent: "capture",
            };
            return <>
                <PayPalScriptProvider options={initialOptions}>
                <div className="bg-gray-100 mobl:px-4 xs:px-2 flex items-center min-h-screen justify-center py-8">
                 <div className="flex items-center flex-col gap-4">
            <div className="max-w-[800px]">
            <div className="flex items-center mb-4 xxs:justify-around xs:justify-between">
                <h1 className="text-2xl font-semibold">Checkout</h1>
                <button onClick={remove_order} className="text-sm bg-red-600 px-4 rounded py-2 font-semibold">Remove order</button>
            </div>
                {order && <div className="bg-white rounded-lg shadow-md xxs:p-2 xs:p-6">
                    <table className="w-full">
                        <thead>
                            <tr className="flex justify-between items-center">
                                <th className="text-left font-semibold">Product</th>
                                <td>{order.createDate}</td>
                            </tr>
                        </thead>
                        {variant && <tbody>
                            <tr>
                                <td className="py-4">
                                    <div className="flex sm:flex-row xxs:flex-col items-center">
                                        <img className="mr-4 w-[210px] h-[190px]" width={150} height={150} loading="lazy" src={`${variant.variantImage}?x-oss-process=image/format,webp,image/resize,m_fill,w_150,h_150`} alt="Image" />
                                        <div className="flex xxs:mt-5 sm:mt-0 justify-between flex-col space-y-1">
                                        <span className="font-semibold border-b">{variant.variantNameEn}</span>
                                        <span>Weight: {variant.variantWeight}g</span>
                                        <span>Standard: {variant.variantStandard}mm</span>
                                        <span>Price: ${Number(variant.variantSellPrice).toFixed(2)}</span>
                                        </div>

                                    </div>
                                </td>
                            </tr>
                        </tbody>}
                        <tbody>
                            <tr>
                                <th className="text-left font-semibold border-t">Shipping Details</th>
                            </tr>
                            <tr className="flex flex-col mt-2 mb-1">
                                <td>Full Name: {order.shippingCustomerName}</td>
                                <td>Phone number: {order.shippingPhone}</td>
                                <td>Full Address: {order.shippingCountryCode}, {order.shippingProvince}, {order.shippingCity}, {order.shippingAddress}.</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th className="text-left font-semibold border-t">Logistics</th>
                            </tr>
                            <tr className="flex flex-col mt-2 mb-1">
                                <td>Logistic name: {order.logisticName}</td>
                                <td>Logistic price: ${Number(order.postageAmount).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h2 className="text-lg font-semibold mb-4 border-t mt-2">Summary</h2>
                    <div className="flex justify-between mb-2">
                        <span>Product</span>
                        <span>${variant && Number(variant.variantSellPrice).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Shipping</span>
                        <span>${Number(order.postageAmount).toFixed(2)}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between mb-2">
                        <span className="font-semibold">Total</span>
                        <span className="font-semibold">${Number(order.orderAmount).toFixed(2)}</span>
                    </div>
                    <div className="w-full flex justify-center flex mt-4">
                    <PayPalButtons
                        className="w-full"
                        createOrder={(data, actions) => createOrder(data, actions)}
                        onApprove={(data, actions) => onApprove(data, actions)}
                        onError={(e) => alert("Paypal error. try again.")}
                        onCancel={(e) => alert("Payment canceled.")}
                    />
                </div>
                </div>}
            </div>
        </div>
        </div>
                </PayPalScriptProvider>
            </> 
        } else if(paymentSessionExpired) {
            return <>
            <Header></Header>
                <div className="h-[60vh] flex items-center justify-center flex-col">
                <p>Payment Session Expired.</p>
                <a href="/purchase" className="rounded py-1 px-2 bg-[#fd5702]">Go to purchase</a>
                </div>
            <Footer></Footer>
            </>
        }
    }, [majorError, globalLoading, paymentSessionExpired, orderRemoved, variant, order])
    return render
}

export default ProcessPurchase