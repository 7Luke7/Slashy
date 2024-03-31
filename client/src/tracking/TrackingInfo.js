import {Header} from "../Components/Header"
import {Footer} from "../Components/Footer"
import { useEffect } from "react"
export const TrackingInfo = () => {
    useEffect(() => {
        document.title = "Tracking - Slashy"
    }, [])
    return <>
      <Header></Header>
        <div className="h-[70vh]">
            <div className="p-10">
                <h1 className="border-b w-[150px] text-gray-900">
                    Tracking product
                </h1>
                <div className="px-2">
                <p className="text-gray-700 text-[15px] font-normal">
                    Dear customer, if you want to track the order follow instructions below:
                </p>
                <ul className="px-2">
                    <li className="text-[14px] text-gray-600 font-semibold">1. Purchase product</li>
                    <li className="text-[14px] text-gray-600 font-semibold">2. Mark the orderId and purchaseId that you gonna receive after successful payment</li>
                    <li className="text-[14px] text-gray-600 font-semibold">3. Email us your orderId and purchaseId at info@slashy.store</li>
                    <li className="text-[14px] text-gray-600 font-semibold">3. Usually tracking number will be avaliabe in 2-5 days. For further question email us at info@slashy.store</li>
                </ul>
                </div>
            </div>
        </div>
      <Footer></Footer>  
    </>
}