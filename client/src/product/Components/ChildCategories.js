import { memo } from "react"
import {Link} from "react-router-dom"

export const ChildCategories = memo(({product}) => {
    const categoryIds = product && product.CategoryIds && product.CategoryIds.split(",")

    return (
        <div className="flex xxs:hidden lg:flex sm:flex">
            {product && product.CATEGORY && product.CATEGORY.includes(">") ? product.CATEGORY.split(">").map((a, i) => {
                return (
                    <div key={i} className="flex items-center">
                        <Link to={`/search?category=${categoryIds[i]}&page=1`} className="lg:text-xs xxs:text-[13px] cursor-pointer text-blue-500 underline">{a}</Link>
                        {i < product.CATEGORY.split(">").length - 1 && <span>\</span>}
                    </div>
                );
            }) : null}
        </div>
    );
    
})

ChildCategories.displayName = "ChildCategories"