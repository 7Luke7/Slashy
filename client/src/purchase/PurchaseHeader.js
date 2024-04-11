import Logo from "../public/slashy_logo.webp"
import outChevron from "../public/out-chevron.svg"
import check from "../public/check.svg"
import { memo } from "react"
import { Link } from "react-router-dom"

export const PurchaseHeader = memo(() => {
    return <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
    <Link to="/">
    <img loading="lazy" className="xxs:w-[80px] lg:w-[90px] object-cover xxs:h-[50px] lg:h-[40px]" src={Logo} alt="logo"></img>
</Link>
<div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
  <div className="relative">
    <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
      <li className="flex items-center space-x-3 text-left sm:space-x-4">
        <a className="flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(255,128,64,0.5)] text-xs font-semibold text-[rgb(255,128,64)]" href="#">
          <img loading="lazy" src={check} alt="past step"></img>
        </a>
        <span className="font-semibold text-gray-900">Select</span>
      </li>
      <img loading="lazy" src={outChevron} alt="next step"></img>
      <li className="flex items-center space-x-3 text-left sm:space-x-4">
        <a className="flex h-6 w-6 items-center justify-center rounded-full bg-[rgb(255,128,64)] text-xs font-semibold text-white animate-pulse" href="#"></a>
        <span className="font-semibold text-gray-900">Purchase</span>
      </li>
    </ul>
  </div>
</div>
</div>
})