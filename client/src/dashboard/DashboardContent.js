import Chart from "react-apexcharts";
import boxes from "../public/boxes.svg";
import box from "../public/box.svg";
import cash from "../public/cash.svg";
import bag from "../public/bag.svg";
import prev from "../public/chevron-left.svg";
import next from "../public/chevron-right.svg";
import withdrawIcon from "../public/withdraw.svg";
import {Link, useOutletContext} from "react-router-dom"
import { useMemo, useState } from "react";

export const DashboardContent = () => {
    const [page, setPage] = useState(0)
    const [monthlyStats, setMonthlyStats] = useState()
    const data = useOutletContext()
    
    document.title = "Affiliate Dashboard - Slashy"
    const chart = useMemo(() => {
        function getCurrentMonthItems(items) {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            
            return items.filter(item => {
                const itemDate = new Date(item.createTime);
                const itemMonth = itemDate.getMonth() + 1;
                
                return itemMonth === currentMonth;
            });
        }
        
        const currentMonthItems = getCurrentMonthItems(data.itemSold);
        const monthly_commision_earnings = currentMonthItems.reduce((accumulator, currentValue) => currentValue.comissionAmmount + accumulator, 0)        
        
        setMonthlyStats({
            earnings: Number(monthly_commision_earnings).toFixed(2),
            sold: currentMonthItems.length
        })

        const groupedItems = {};
        data.itemSold.forEach((item) => {
            const createTime = new Date(item.createTime);
            const month = createTime.getMonth()
        
            if (!groupedItems[month]) {
                groupedItems[month] = [item];
            } else {
                groupedItems[month].push(item);
            }
        });

        const series = ["", "", "", "", "", "", "", "", "", "", "", ""]

        Object.keys(groupedItems).map((a) => series[a] = groupedItems[a].length)

        return {
                series: [
                    {
                        name: ["Monthly sales"],
                        data: series
                    },
                ],
                options: {
                    colors : ['#f97316', '#242e35'],
                    chart: {
                        type: 'bar',
                        height: 380,
                        stacked: true,
                        toolbar: {
                            show: true
                        },
                        zoom: {
                            enabled: true
                        }
                    },
                    xaxis: {
                        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    },
                    title: {
                        text: 'Products sold',
                    },
                    responsive: [
                        {
                            breakpoint: 1535,
                            options: {
                                chart: {
                                    height: "420px",
                                    width: "100%",
                                },
                                legend: {
                                    position: "bottom"
                                  }
                            },
                        },
                        {
                            breakpoint: 1920,
                            options: {
                                chart: {
                                    width: "600px",
                                },
                                legend: {
                                    position: "bottom"
                                  }
                            },
                        },
                    ]
                },
            }
    }, [data])

    const transaction_quantity = data && data.itemSold && data.itemSold.length

    const slice_first = page * 4
    const slice_second = slice_first + 4    
    
    return <div>
        <div className="flex items-center h-16 border-b justify-between px-2">
            <div className="flex flex-col">
                <div className="flex items-center">
                    <div className="flex items-center">
                        <Link className="text-[#1b254b] text-xs underline" to="/dashboard">dashboard/</Link>
                    </div>
                </div>
                <h1 className="text-[#1b254b] text-lg font-bold">Dashboard</h1>
            </div>
            <div>
                <Link to="/withdraw" target="_blank" className="flex items-center bg-orange-500 hover:bg-orange-600 rounded px-4 py-2 gap-x-2">
                    <img src={withdrawIcon} alt="cash"></img>
                    <p className="text-xs font-bold text-gray-[800]">Withdraw funds</p>
                </Link>
            </div>
        </div>
        <div className="lg:w-[95%] xl:w-[90%] mt-5 mx-auto">
        <div className="flex lg:flex-row xxs:w-[95%] xxs:mx-auto lg:flex-wrap xxs:flex-col xxs:gap-y-3 xl:space-y-0 items-center justify-between border-b pb-5">
            <div className="xl:w-[200px] lg:w-1/2 relative xxs:w-full xxs:h-[100px] h-[100px] flex items-center justify-center rounded shadow-md">
                <span className="absolute rounded-t top-0 left-0 h-[2.5px] right-0 bg-[#f97316]"></span>
                <span className="absolute rounded-l top-0 left-0 bottom-0 w-[2.5px] right-0 bg-[#f97316]"></span>
                <div className="flex space-x-5 items-center">
                    <div className="bg-gray-100 rounded-[50%] p-2">
                    <img src={bag} alt="overall earnings"></img>   
                 </div>
                    <div className="flex-col items-center">
                        <p className="text-gray-400 tracking-wider font-semibold text-sm">Balance</p>
                        <h2 className="text-[#1b2559] font-bold text-xl">${Number(data.amount).toFixed(2)}</h2>
                    </div>
                </div>
            </div>
            <div className="xl:w-[200px] relative lg:w-1/2 xxs:w-full xxs:h-[100px] h-[100px] flex items-center justify-center rounded shadow-md">
                <span className="absolute rounded-t top-0 left-0 h-[2.5px] right-0 bg-[#f97316]"></span>
                <span className="absolute rounded-l top-0 left-0 bottom-0 w-[2.5px] right-0 bg-[#f97316]"></span>
                <div className="flex space-x-5 items-center">
                    <div className="bg-gray-100 rounded-[50%] p-2">
                    <img src={box} alt="overall sold"></img>   
                    </div>
                    <div className="flex-col items-center">
                        <p className="text-gray-400 tracking-wider font-semibold text-sm">Sold Products</p>
                        <h2 className="text-[#1b2559] font-bold text-xl">{data.itemSold.length}</h2>
                    </div>
                </div>
            </div>
            <div className="xl:w-[200px] relative lg:w-1/2 xxs:w-full xxs:h-[100px] h-[100px] flex items-center justify-center rounded shadow-md">
                <span className="absolute rounded-t top-0 left-0 h-[2.5px] right-0 bg-[#1b2559]"></span>
                <span className="absolute rounded-l top-0 left-0 bottom-0 w-[2.5px] right-0 bg-[#1b2559]"></span>
                <div className="flex space-x-5 items-center">
                    <div className="bg-gray-100 rounded-[50%] p-2">
                        <img src={cash} alt="monthly earning"></img>
                    </div>
                    <div className="flex-col items-center">
                        <p className="text-gray-400 tracking-wider font-semibold text-sm">Monthly earnings</p>
                        <h2 className="text-[#1b2559] font-bold text-xl">${monthlyStats && monthlyStats.earnings}</h2>
                    </div>
                </div>
            </div>
            <div className="xl:w-[200px] relative lg:w-1/2 xxs:w-full xxs:h-[100px] h-[100px] flex items-center justify-center rounded shadow-md">
                <span className="absolute rounded-t top-0 left-0 h-[2.5px] right-0 bg-[#1b2559]"></span>
                <span className="absolute rounded-l top-0 left-0 bottom-0 w-[2.5px] right-0 bg-[#1b2559]"></span>
                <div className="flex space-x-5 items-center">
                    <div className="bg-gray-100 rounded-[50%] p-2">
                    <img src={boxes} alt="monthly sold"></img>
                    </div>
                    <div className="flex-col items-center">
                        <p className="text-gray-400 tracking-wider font-semibold text-sm">Monthly sold</p>
                        <h2 className="text-[#1b2559] font-bold text-xl">{monthlyStats && monthlyStats.sold}</h2>
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-5 2xl:flex-row xxs:flex-col flex space-x-5 xl:flex-[6]">
            <div className="lg:block 2xl:flex-[6] xxs:hidden">
            <Chart
              options={chart.options}
              series={chart.series}
              type="bar"
            />
            </div>
            <div className="xl:flex-[6] xxs:mb-5 xl:mb-0">
                <h2 className="font-bold text-lg">All transactions({transaction_quantity || 0})</h2>
                {transaction_quantity > 0 ? <div className="flex w-full flex-col">
                <div className="overflow-x-auto w-full">
                    <div className="pt-1.5 w-full inline-block align-middle">
                    <div className="oveflow-x-auto border flex flex-col justify-between rounded-lg">
                        <table className="divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                Image
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                Amount
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                Exact date
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                Link
                            </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data && data.itemSold && data.itemSold.slice(slice_first, slice_second).map((item, i) => {
                                return <tr key={i}>
                                <td className="px-6 py-4">
                                    <img className="h-[40px] w-[50px] rounded" loading="lazy" src={`${item.variantImage}?x-oss-process=image/format,webp,image/resize,m_fill,w_80,h_80`}></img>
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-green-500 whitespace-nowrap">
                                    ${Number(item.comissionAmmount).toFixed(2)}
                                </td>
                                <td className="px-6 py-4 text-xs font-bold text-gray-800 whitespace-nowrap">
                                    {item.createTime}
                                </td>
                                 <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                    <Link className="bg-[#f97316] rounded px-2 py-1 text-white" target="_blank" to={item.link}>View</Link>
                                </td>
                                </tr>
                            })}
                        </tbody>
                        </table>
                        <div className="flex lg:justify-end items-center px-6 pb-1 gap-1">
                            <span className="text-xs">page: {page}</span>
                            <button type="button" onClick={() => {
                                if (page !== 0) {
                                    setPage(page - 1)
                                }
                            }} className="flex bg-gray-200 outline-none rounded-[50%] p-2 items-center justify-center">
                                <img src={prev} alt="next"></img>
                            </button>
                            <button type="button" onClick={() => {
                                if (page + 1 < transaction_quantity / 4) {
                                    setPage(page + 1)
                                }
                            }} className="flex bg-gray-200 outline-none rounded-[50%] p-2 items-center justify-center">
                                <img src={next} alt="prev"></img>
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
                </div> : <h2>No transactions from your affiliated links.</h2>}
            </div>
        </div>
        </div>
    </div>
}