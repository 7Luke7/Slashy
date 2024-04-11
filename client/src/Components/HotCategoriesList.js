import { useState } from "react"
import {Link} from "react-router-dom"

export const HotCategoriesList = ({it}) => {
    const [isLoading, setIsLoading] = useState(true)
    return <div className="transition-transform duration-100 ease-out transform md:hover:scale-[1.02] md:hover:rounded-tr-lg md:hover:rounded-tl-lg md:hover:border-gray-300 md:hover:border mobl:w-full xs:w-[260px] xxs:w-[240px] sm:h-[350px] p-2">
            <Link to={`search?category=${it.categoryId}&page=1`}>
                <img
                loading="lazy"
                className="object-cover rounded-tr-lg rounded-tl-lg mobl:w-full xxs:w-[260px] xxs:h-[300px] md:w-[260px] md:h-[320px]"
                src={isLoading ? `${it.bigImage}?x-oss-process=image/format,webp,image/resize,m_fill,w_30` : `${it.bigImage}?x-oss-process=image/format,webp,image/resize,m_fill,w_280`}
                onLoad={() => setIsLoading(false)}
                alt={`category: ${it.categoryNameEn}`}
            ></img>
            <article itemScope itemType="https://schema.org/Product">
                <h2 
                className="text-md min-h-[60px] text-gray-600 font-bold"
                itemProp="category"
                >
                {it.categoryNameEn}
                </h2>
            </article>
            </Link>
          </div>
}