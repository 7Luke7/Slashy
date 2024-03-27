import { Fragment } from "react"

export const SingleService = ({ changeLogistic, f, selectedLogistic }) => {
    return <Fragment>
        <div onClick={() => changeLogistic(f)} className="relative">
    <span className={`absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 ${f.logisticName === selectedLogistic.logisticName && "border-[rgb(255,128,64)]"} rounded-full border-8`} onClick={() => changeLogistic(f)}></span>
    <div className={`${selectedLogistic.logisticName === f.logisticName && "border-2 bg-gray-50 border-[rgb(255,144,80)]"} flex cursor-pointer select-none rounded-lg border p-4`}>
        <div className="ml-5">
        <span className="mt-2 font-semibold">{f.logisticName}</span>
        <p className="text-slate-500 text-sm leading-6">Delivery: {f.aging
        } days</p>
        <p className="text-slate-500 text-sm leading-6">Price: ${Number(f.price).toFixed(2)}</p>
        </div>
    </div>
    </div>
    </Fragment>
}