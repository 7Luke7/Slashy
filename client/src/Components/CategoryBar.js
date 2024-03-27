import searchNav from "./searchNav.json"
import { useState, Fragment, memo } from 'react';
import {MobCategoryList} from "./MobCategoryList"
import {MobCategoryBarUtil} from "./MobCategoryBarUtil"

export const CategoryBar = () => {
    const [categories, setCategories] = useState(searchNav)
    const [parents, setParents] = useState([])

    const closeBar = () => {
        const closeScroll = document.getElementById("closeScroll")
        const catBar = document.getElementById("catBar")
        catBar.style.display = "none"

        closeScroll.style.overflow = "visible";
        closeScroll.style.position = "relative"
    }

    const expandCategory = (cat) => {
        setCategories(cat.children)
        setParents([...parents, cat])
    }

    const backToParent = (parent, index) => {
        if (index === parents.length - 1) {
            return
        }
        const parent_removed = parents.filter((p) => p.id === parent.id)
        setParents(parent_removed)
        setCategories(parent.children)
    }

    const MemoizedMobCategoryBarUtil = memo(MobCategoryBarUtil)
    const MemoizedMobCategoryList = memo(MobCategoryList)

    return <Fragment>
        <div id="catBar" className='fixed pt-5 hidden overflow-y-scroll px-10 z-[1000] h-screen bg-slate-500 left-0 bg-white right-0 top-0 bottom-0'>
        <MemoizedMobCategoryBarUtil closeBar={closeBar}></MemoizedMobCategoryBarUtil>
        <div className="mt-5 flex-wrap flex items-center">
            {parents && <div className="flex">
                <button onClick={() => {
                    setParents([])
                    setCategories(searchNav)
                }} className="underline text-xs">Default</button>
                <span>\</span>
                </div>}
            {parents && parents.map((p, i) => {
                return <div key={i} className="flex pl-[1px]">
                <button onClick={() => backToParent(p, i)} className="underline text-xs">{p.nameEn}</button>
                {i !== parents.length - 1 && <span>\</span>}
                </div>
            })}
        </div>
        <MemoizedMobCategoryList categories={categories} expandCategory={expandCategory} closeBar={closeBar}></MemoizedMobCategoryList>
    </div>
    </Fragment>
}