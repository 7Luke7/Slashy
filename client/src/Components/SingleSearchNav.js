import { memo } from "react";
import { Link } from "react-router-dom";

export const SingleSearchNav = memo(({cat, setCatChild}) => {
    return <li onMouseOver={() => setCatChild(cat.children)} className="w-[180px] font-semibold text-[12px]">
    <Link to={`/search?category=${cat.id}&page=1`}>
        {cat.nameEn}                  
    </Link>
  </li>
})

SingleSearchNav.displayName = 'SingleSearchNav';