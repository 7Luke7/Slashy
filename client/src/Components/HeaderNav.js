import Cart from "../public/cart.svg"

export const HeaderNav = () => {
    return <div className='flex sm:flex-[1] items-center justify-center gap-5'>
        <a href="/cart" className='flex flex-col  sm:ml-2 items-center'>
            <div className='relative'>
            <img width={5} height={5} className="w-[24px] h-[24px]" alt="cart" src={Cart}></img>       
                <span id="notification" className='absolute hidden top-0 right-0 -translate-y-1/2 translate-x-1/2 flex items-center justify-center rounded-full bg-[rgb(251,77,1)] p-[6px] text-xs text-white'></span> 
            </div>           
        </a>
</div>
}

HeaderNav.displayName = 'HeaderNav';