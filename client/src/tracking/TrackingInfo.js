import {Header} from "../Components/Header"
import {Footer} from "../Components/Footer"
import { useEffect } from "react"
import tracking from "../public/tracking.svg"

export const TrackingInfo = () => {
    useEffect(() => {
        document.title = "Tracking - Slashy"
        window.scrollTo(0, 0)
    }, [])
    return <>
      <Header></Header>
        <div id="closeScroll" className="flex items-center justify-center h-[70vh]">
            <div className="p-10 flex-[8] flex items-center flex-col">
                <h1 className="text-center text-[#1b2559] text-3xl font-bold">
                    Tracking product
                </h1>
                <div className="px-2 mt-3 flex items-center flex-col">
                    <p className="text-gray-700 text-[15px] font-normal">
                        Dear customer, if you want to track the order follow instructions below:
                    </p>
                    <ul className="px-2 p-3 flex flex-col gap-y-1">
                        <li className="text-[14px] text-gray-600 font-semibold">1. Purchase product</li>
                        <li className="text-[14px] text-gray-600 border-t font-semibold">2. Mark the orderId and purchaseId that you gonna receive after successful payment</li>
                        <li className="text-[14px] text-gray-600 border-t font-semibold">3. Email us your orderId and purchaseId at info@slashy.shop</li>
                        <li className="text-[14px] text-gray-600 border-t font-semibold">4. Usually tracking number will be avaliabe in 2-5 days. For further question email us at info@slashy.shop</li>
                    </ul>
                </div>
            </div>
            <div className="sm:block xxs:hidden flex-[6]">
            <img src={tracking} alt="Product Location tracking"></img>
            </div>
        </div>
      <Footer></Footer>  
    </>
}