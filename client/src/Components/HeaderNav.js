import { useEffect, useState } from "react"
import Cart from "../public/cart.svg"

export const HeaderNav = ({aff}) => {
    const [isAffiliate, setIsAffiliate] = useState()

    useEffect(() => {
        if (document.location.pathname.includes("product")) {
            return
        }        
        const verify_affiliate = async () => {
            try {
                const request = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/verify_affiliate`, {
                    method: "GET",
                    credentials: "include"
                })

                const data = await request.json()

                if (!request.ok) {
                    throw new Error(data.status)
                }
                
                setIsAffiliate(true)
            } catch (error) {
                setIsAffiliate(false)
            }
        }

        verify_affiliate()
    }, [])

   return <div className='flex sm:flex-[3] md:flex-[3] lg:flex-[2] xl:flex-[1] items-center justify-end gap-5'>
        <a href="/cart" className='flex flex-col  sm:ml-2 items-center'>
            <div className='relative'>
            <img className="w-[24px] h-[24px]" alt="cart" src={Cart}></img>       
                <span id="notification" className='absolute hidden top-0 right-0 -translate-y-1/2 translate-x-1/2 flex items-center justify-center rounded-full bg-[rgb(251,77,1)] p-[6px] text-xs text-white'></span> 
            </div>           
        </a>
        {aff == false || isAffiliate == false ? <a href="/affiliate" className="bg-[#ff8040] focus:scale-[0.95] hover:bg-orange-500 px-2 duration-200 transition-ease-out py-1 rounded shadow-lg font-bold text-[#153144] hover:text-gray-900">
            Join affiliate
        </a> : <a href="/dashboard" className="relative bg-[#ff8040] focus:scale-[0.95] hover:bg-orange-500 px-2 duration-200 transition-ease-out py-1 rounded shadow-lg font-bold text-[#153144] hover:text-gray-900">
            <span id="notify_affiliate" className='absolute hidden top-0 right-0 -translate-y-1/2 translate-x-1/2 flex items-center justify-center rounded-full bg-green-500 p-[6px] text-xs text-white'></span> 
            Dashboard
        </a>}
    </div>
}

HeaderNav.displayName = 'HeaderNav';