import {HeaderLogo} from "./HeaderLogo"
import {HeaderNav} from "./HeaderNav"
import { SearchProducts } from './SearchProducts';
import {MobileSearch} from "./MobileSearch"
import {CategoryBar} from "./CategoryBar"
import { memo } from "react";

export const Header = memo(({aff}) => {
    const MemoizedCategoryBar = memo(CategoryBar)
    const MemoizedHeaderLogo = memo(HeaderLogo)
    const MemoizedSearchProducts = memo(SearchProducts)
    const MemoizedMobileSearch = memo(MobileSearch)

return <div id="header_container" className='sticky z-[500] right-0 left-0 top-0'>
    <header className='border border-b-1 bg-white'>
    <div className="flex items-center xxs:justify-between lg:w-[90%] xl:w-[95%] xxs:w-[90%] m-auto sm:justify-evenly sm:px-5 py-2">
        <MemoizedHeaderLogo></MemoizedHeaderLogo>
        <MemoizedSearchProducts></MemoizedSearchProducts>
        <HeaderNav aff={aff}></HeaderNav>
    </div>
    <MemoizedMobileSearch></MemoizedMobileSearch>
</header>
    <MemoizedCategoryBar></MemoizedCategoryBar>
    </div>
})

Header.displayName = 'Header';