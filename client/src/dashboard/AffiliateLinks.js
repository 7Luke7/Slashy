import { useEffect, useState } from "react"
import {Link, useOutletContext} from "react-router-dom"
import prev from "../public/chevron-left.svg";
import next from "../public/chevron-right.svg";

export const AffiliateLinks = () => {
    const [page, setPage] = useState(0)
    const data = useOutletContext()

    useEffect(() => {
        document.title = "Affiliate Links - Slashy"
        localStorage.removeItem('notify')
        document.getElementById("notify_affiliate_dashboard").style.display = "none"
    }, [])

    const deleteAffiliateLink = async (id) => {
        try {
            const request = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/delete_affiliateLink/${id}`, {
                method: "DELETE",   
                credentials: "include",
            })

            const data = await request.json()

            if (!request.ok) {
                throw new Error(data.message)
            }

            alert("product removed. please refresh the page to view update.")
        } catch (error) {
            alert(error.message)
        }
    }

    const affiliate_link_quantity = data && data.affiliateLinks && data.affiliateLinks.length
    const slice_first = page * 8
    const slice_second = slice_first + 8
    return <>
        <div className="flex flex-col h-16 border-b p-2">
            <div className="flex items-center">
                <div className="flex items-center">
                    <Link className="text-[#1b254b] text-xs underline" to="/dashboard/links">dashboard/links</Link>
                </div>
            </div>
            <h1 className="text-[#1b254b] text-lg font-bold">Links</h1>
        </div>
        <div className="w-[90%] mt-5 mx-auto">
    <h2 className="font-bold text-lg">Affiliate links({affiliate_link_quantity || 0})</h2>
    {affiliate_link_quantity ? <div className="flex flex-col">
    <div className="overflow-x-auto">
        <div className="pt-1.5 inline-block align-middle">
        <div className="overflow-hidden border rounded-lg">
            <table className="divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                    Product Link
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                    Comission earnings
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                    Action
                </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {data && data.affiliateLinks && data.affiliateLinks.slice(slice_first, slice_second).map((l, i) => {
                      return <tr key={i}>
                      <td className="px-6 py-4">
                          <Link className="h-[40px] underline text-blue-500 rounded" target="_blank" to={l.link}>{l.link}</Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-green-500 text-center font-bold text-gray-800 whitespace-nowrap">
                          ${Number(l.earning).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-green-500 text-center font-bold text-gray-800 whitespace-nowrap">
                          <button type="button" className="bg-red-800 text-gray-100 text-sm px-4 rounded py-1" onClick={() => deleteAffiliateLink(l._id)}>Delete</button>
                      </td>
                      </tr>
                   }) 
                }
            </tbody>
            </table>
                <div className="flex justify-end items-center px-6 pb-1 gap-1">
                <span className="text-xs">page: {page}</span>
                <button type="button" onClick={() => {
                    if (page !== 0) {
                        setPage(page - 1)
                    }
                }} className="flex bg-gray-200 outline-none rounded-[50%] p-2 items-center justify-center">
                    <img src={prev} alt="next"></img>
                </button>
                <button type="button" onClick={() => {
                    if (page + 1 < affiliate_link_quantity / 8) {
                        setPage(page + 1)
                    }
                }} className="flex bg-gray-200 outline-none rounded-[50%] p-2 items-center justify-center">
                    <img src={next} alt="prev"></img>
                </button>
            </div>
            
        </div>
        </div>
    </div>
    </div> : <h2 className="text-gray-800 text-sm">You have no links added, go to any product and click "affiliate" button.</h2>}
    </div>
</>
}