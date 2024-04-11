import { Fragment, useState } from "react";
import {Link} from "react-router-dom"

export const SearchProduct = ({p}) => {
  const [isLoading, setIsLoading] = useState(true)

    return <section className="xxs:w-[220px] lg:w-[200px] xs:w-[180px] mobl:w-[160px] xl:w-[200px] transition-transform duration-100 ease-out transform hover:scale-[1.01]">
      <Link to={`/product/${p.id}`}>
        <div className="relative">
        <img
          loading="lazy"
          className="object-cover border object-bottom h-[200px] rounded-t w-full"
          src={isLoading ? `${p.bigImage}?x-oss-process=image/format,webp,image/resize,m_fill,w_25,h_25` : `${p.bigImage}?x-oss-process=image/format,webp,image/resize,m_fill,w_179,h_190`}
          onLoad={() => setIsLoading(false)}
          alt={p.nameEn.substring(0, 60)}
        ></img>
        </div>
        <article itemScope itemType="https://schema.org/Product">
          <Fragment>
          <div className="h-7">
          <span itemProp="price" className="text-[rgb(251,77,1)] font-bold xxs:text-[20px] text-sm">{p.sellPrice}$</span></div>
          <h2
            className="xxs:text-sm text-gray-800 font-bold mobl:text-xs"
            itemProp="name"
          >
            {p.nameEn.substring(0, 100)}...
          </h2>
          </Fragment>
          
        </article>
        </Link>
      </section>
}