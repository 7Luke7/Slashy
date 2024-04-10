import Facebook from "../public/facebook.svg"
import Tiktok from "../public/tiktok.svg"
import Instagram from "../public/instagram.svg"
import Youtube from "../public/youtube.svg"
import envelopeFill from "../public/envelope-fill.svg"

export const Footer = () => {
    const handlePaypalClick = () => {
        window.open(
          'https://www.paypal.com/webapps/mpp/paypal-popup',
          'WIPaypal',
          'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700'
        );
      };
    return <div className="w-full bg-[rgb(242,242,242)]">
    <div className="sm:w-[70%] xxs:w-[100%] xxs:grid xxs:grid-cols-2 p-5 flex-wrap xxs:gap-5 lg:gap-0 lg:flex justify-evenly m-auto">
    <main className="list-none flex flex-col gap-3">
    <h2 className="text-sm font-[600] text-gray-900">Navigation</h2>
    <hr className="border-1 border-[rgb(251,77,1)]" />
    <li className="text-xs font-[600] text-gray-700">
        <a href="/tracking">Tracking product</a>
    </li>
    <li className="text-xs font-[600] text-gray-700">
        <a href="/affiliate">Become an affiliate</a>
    </li>

</main>
    <main className="list-none flex flex-col gap-3">
          <h2 className="text-sm font-[600] text-gray-900">Supported payments</h2>
          <hr className="border-1 border-[rgb(251,77,1)]" />
          <li>
          <a href="https://www.paypal.com/ge/webapps/mpp/paypal-popup" target="_blank" title="How PayPal Works" onClick={handlePaypalClick}>
            <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/AM_mc_vs_ms_ae_UK.png" border="0" className="w-[160px]" alt="PayPal Acceptance Mark" />
            </a>
          </li>
        </main>
<main className="list-none flex flex-col gap-3">
    <h2 className="text-sm font-[600] text-gray-900">Follow us</h2>
    <hr className="border-1 border-[rgb(251,77,1)]" />
    <li>
      <a href="https://www.facebook.com/people/Slashy-shop/61557911885393/" className="flex items-center gap-2" target="_blank">
        <img src={Facebook} alt="facebook" loading="lazy" width={16} height={16}></img>
        <p className="text-xs font-[600] text-gray-700">Facebook</p>
      </a>
    </li> 
    <li>
      <a href="https://www.instagram.com/slashyshopp/" className="flex items-center gap-2" target="_blank">
        <img src={Instagram} alt="tiktok" loading="lazy" width={16} height={16}></img>
        <p className="text-xs font-[600] text-gray-700">Instagram</p>
      </a>
    </li>
    <li>
      <a href="https://www.tiktok.com/@slashyshopp" className="flex items-center gap-2" target="_blank">
        <img src={Tiktok} alt="tiktok" loading="lazy" width={16} height={16}></img>
        <p className="text-xs font-[600] text-gray-700">Tiktok</p>
      </a>
    </li>
    <li>
      <a href="https://www.youtube.com/channel/UCfu0hHMM_PG-SoYYlhPSlnQ" className="flex items-center gap-2" target="_blank">
        <img src={Youtube} alt="youtube" loading="lazy" width={16} height={16}></img>
        <p className="text-xs font-[600] text-gray-700">Youtube</p>
      </a>
    </li>
</main>
<main className="list-none flex flex-col gap-3">
    <h2 className="text-sm font-[600] text-gray-900">Contact</h2>
    <hr className="border-1 border-[rgb(251,77,1)]" />
    <li className="text-xs font-[600] text-gray-700 flex items-center gap-2">
    <img src={envelopeFill} alt="mail" loading="lazy" width={16} height={16}></img>
      info@slashy.shop
    </li>
</main>
    </div>
    <div className="xxs:w-[100%] sm:w-[60%] text-center p-5 m-auto">
    <hr />
        <p className="text-xs font-bold text-gray-600 pt-5">Copyright © {new Date().getFullYear()} slashy.shop All rights reserved.</p>
    </div>
    </div>  
}