import person from "../public/person.svg"
import analytics from "../public/analytics.svg"
import arrowBack from "../public/arrow-back.svg"
import linkIcon from "../public/link.svg"
import { memo, useEffect } from "react"
import { Link } from "react-router-dom"

export const Sidebar = memo(() => {
    const Logout = async () => {
        try {
            const logout = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/logout`, {
                method: "DELETE",
                credentials: "include"
            })
            
            if (!logout.ok) {
                throw new Error("Something went wrong.")
            } 

            window.location.assign("/signin")
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
      if (localStorage.getItem('notify') === "true") {
        document.getElementById("notify_affiliate_dashboard").style.display = "block"
      }
    }, [])
    return <div className="flex w-full flex-col justify-between h-full bg-gray-900 text-white w-64">
    <div className="xxs:hidden lg:flex items-center justify-center h-16 bg-orange-500">
      <h1 className="text-xl font-bold">Sidebar</h1>
    </div>
    <div className="flex flex-col flex-grow p-4">
      <Link to="/dashboard" className="py-2 px-4 flex items-center rounded text-gray-300 hover:text-white hover:bg-orange-600 transition duration-300 ease-in-out">
      <img alt="analytics" className="mr-2" src={analytics}></img>
        Dashboard
      </Link>
      <Link to="/dashboard/links" className="relative py-2 px-4 flex items-center rounded text-gray-300 hover:text-white hover:bg-orange-600 transition duration-300 ease-in-out">
      <img src={linkIcon} className="mr-2" alt="person"></img>
      <span id="notify_affiliate_dashboard" className='absolute hidden top-0 right-0 -translate-y-1/2 translate-x-1/2 flex items-center justify-center rounded-full bg-green-500 p-[6px] text-xs text-white'></span> 
        Affiliate links
      </Link>
      <Link to="/dashboard/account" className="py-2 px-4 flex items-center rounded text-gray-300 hover:text-white hover:bg-orange-600 transition duration-300 ease-in-out">
      <img src={person} className="mr-2" alt="person"></img>

        Account
      </Link>
      <Link to="/" className="py-2 px-4 flex items-center rounded text-gray-300 hover:text-white hover:bg-orange-600 transition duration-300 ease-in-out">
      <img src={arrowBack} alt="arrow back" className="mr-2"></img>
      Home
    </Link>
    </div>
    <div className="p-4">
      <button onClick={Logout} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full transition duration-300 ease-in-out">
        Sign out
      </button>
    </div>
  </div>
})