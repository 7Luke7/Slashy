import ChevronDown from "../public/chevron-down.svg"
import {Link} from "react-router-dom"

export const MobCategoryList = ({categories, expandCategory, closeBar}) => {
    return <div className="flex list-none justify-start gap-[19px] mt-5 flex-col">
    {categories.map((cat, i) => {
    return <div key={i} className="flex border-t justify-between items-center">
        <Link to={`/search?category=${cat.id}&page=1`} onClick={closeBar} key={i} className='text-left font-bold text-[15px]'>
            {cat.nameEn}                  
        </Link>
        {cat.children.length > 0 && <button className="flex flex-grow justify-end" onClick={() => expandCategory(cat)}>
        <img width={16} height={16} src={ChevronDown} fetchpriority="high" alt="expand" />
    </button>}
    </div>
    })}
</div>
}