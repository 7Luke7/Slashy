import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { Sidebar } from "./Sidebar"

export const Dashboard = () => {
    const [user, setUser] = useState()

    useEffect(() => {
        const verifyAffiliate = async () => {
            try {
                const request = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/get_affiliate`, {
                    method: "GET",
                    credentials: "include",
                    cache: "no-cache"
                })

                const data = await request.json()

                if (!request.ok) {
                    throw new Error(data.message)
                }
                
                setUser(data)
            } catch (error) {
                if (error.message === "Client has no authority to access the page") {
                    return window.location.assign("/")
                }
                alert(error.message)
            }
        }

        verifyAffiliate()
    }, [])

    return user && <div className="lg:flex-row flex xxs:flex-col min-h-screen">
    <div className="bg-gray-800 lg:flex-1/12 lg:w-3/12 xl:flex-1/12">
        <Sidebar />
    </div>
    <div className="w-full lg:flex-10/12 xl:flex-11/12">        
        <Outlet context={user}></Outlet>
    </div>
</div>
}