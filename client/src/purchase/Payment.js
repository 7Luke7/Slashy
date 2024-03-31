import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import check from "../public/check-success.svg"
import { Header } from "../Components/Header"
import { Footer } from "../Components/Footer"

export const Payment = () => {
    const [order, setOrder] = useState()
    const [noProductFound, setNoProductFound] = useState()

    const {id} = useParams()
    useEffect(() => {
        const fetch_payment = async () => {
            try {
                const request_all_variants = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/payment/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                })

                if (request_all_variants.status === 400) {
                    throw new Error(400)
                }
                const data = await request_all_variants.json()
                setOrder(data)
            } catch (error) {
                if (error.message === "400") {
                    return setNoProductFound(true)
                }
                alert(error.message)
            }
        }   

        fetch_payment()
    }, [])

    const render = useMemo(() => {
        if (order && order.status !== 400) {
            return <>
                <Header></Header>
                <div className="justify-center flex items-center h-[70vh]">
            <div className="bg-white p-6  md:mx-auto">
                  <div className="flex justify-center">
                    <div className="rounded-[50%] bg-[#B3FFAE]">
                    <img src={check} loading="lazy" alt="success"></img>
                    </div>
                  </div>
              <div className="text-center xxs:w-[350px] sm:w-[400px] lg:w-[500px]">
                  <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Thanks for purchase!</h3>
                  <ul className="border-b">
                    <li className="overflow-hidden break-all">Payment Id: {id}</li>
                    <li className="overflow-hidden break-all">Order number: {order.cj_order.orderNum}</li>
                  </ul>
                  <p className="text-gray-600 my-2 font-bold">If you want to track your order please send payment id and order id to our email: info@slashy.store</p>
                  <div className="py-5 text-center">
                      <a href="/" className="rounded px-12 bg-[#fd5702] text-white font-semibold py-3">
                        Countinue shopping
                     </a>
                  </div>
              </div>
            </div>
            </div>
            <Footer></Footer>
            </>
        } else if (noProductFound) {
            return <>
            <Header></Header>
            <div className="justify-center flex items-center h-[70vh]">
                No product found.
            </div>
            <Footer></Footer>
            </>
        }
    }, [order, noProductFound])
    return render
}