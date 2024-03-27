import { memo } from "react";

export const SingleSearchNav = memo(({cat, setCatChild}) => {
    return <li onMouseOver={() => setCatChild(cat.children)} className="w-[180px] font-semibold text-[12px]">
    <a href={`/search?category=${cat.id}&page=1`}>
        {cat.nameEn}                  
    </a>
  </li>
})

SingleSearchNav.displayName = 'SingleSearchNav';