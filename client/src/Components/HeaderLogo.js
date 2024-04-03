import List from "../public/list.svg"
import Logo from "../public/slashy_logo.webp"

export const HeaderLogo = () => {
    const displayBar = () => {
        const closeScroll = document.getElementById("closeScroll")
        const catBar = document.getElementById("catBar")

        catBar.style.display = "block"        
        closeScroll.style.overflow = "hidden"
        closeScroll.style.position = "fixed"
    }
    return <div className='flex items-center xxs:flex-[2] lg:flex-[1] justify-start'>
    <div className='xxs:flex items-center lg:hidden'>
        <button className='w-[24px] h-[24px]' onClick={displayBar}>
        <img alt="open menu" decoding="lazy" width={24} height={24} src={List}></img>
    </button> 
    </div>
    <a rel="alternate" href="/">
        <img loading="lazy" src={Logo} className="xxs:w-[80px] lg:w-[90px] object-cover xxs:h-[50px] lg:h-[40px]" alt="logo"></img>
    </a>
</div>
}