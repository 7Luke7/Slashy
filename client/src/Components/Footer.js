import Facebook from "../public/facebook.svg"
import Tiktok from "../public/tiktok.svg"
import Instagram from "../public/instagram.svg"
import envelopeFill from "../public/envelope-fill.svg"

export const Footer = () => {
    return <div className="w-full bg-[rgb(242,242,242)]">
    <div className="sm:w-[70%] xxs:w-[100%] xxs:grid xxs:grid-cols-2 p-5 flex-wrap xxs:gap-5 lg:gap-0 lg:flex justify-evenly m-auto">
    <main className="list-none flex flex-col gap-3">
    <h2 className="text-sm font-[600] text-gray-900">Navigation</h2>
    <hr className="border-1 border-[rgb(251,77,1)]" />
    <li className="text-xs font-[600] text-gray-700">
        <a href="/about">About us</a>
    </li>

</main>
<main className="list-none flex flex-col gap-3">
    <h2 className="text-sm font-[600] text-gray-900">Payments</h2>
    <hr className="border-1 border-[rgb(251,77,1)]" />

    <li className="text-xs font-[600] text-gray-700">
        <a href="/payments">Payment Methods</a>
    </li>
</main>
<main className="list-none flex flex-col gap-3">
    <h2 className="text-sm font-[600] text-gray-900">Follow us</h2>
    <hr className="border-1 border-[rgb(251,77,1)]" />

    <li className="text-xs font-[600] text-gray-700 flex items-center gap-2">
        <img src={Facebook} alt="facebook" loading="lazy" width={16} height={16}></img>
        Facebook
    </li>
    <li className="text-xs font-[600] text-gray-700 flex items-center gap-2">
        <img src={Instagram} alt="instagram" loading="lazy" width={16} height={16}></img>
        Instagram
    </li>
    <li className="text-xs font-[600] text-gray-700 flex items-center gap-2">
        <img src={Tiktok} alt="tiktok" loading="lazy" width={16} height={16}></img>
        Tiktok
    </li>
</main>
<main className="list-none flex flex-col gap-3">
    <h2 className="text-sm font-[600] text-gray-900">Contact</h2>
    <hr className="border-1 border-[rgb(251,77,1)]" />
    <li className="text-xs font-[600] text-gray-700 flex items-center gap-2">
    <img src={envelopeFill} alt="mail" loading="lazy" width={16} height={16}></img>
    info@slashy.store</li>
</main>
    </div>
    <div className="xxs:w-[100%] sm:w-[60%] text-center p-5 m-auto">
    <hr />
        <p className="text-xs font-bold text-gray-600 pt-5">Copyright © {new Date().getFullYear()} Slashy.store All rights reserved.</p>
    </div>
    </div>  
}