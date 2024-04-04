import {useState} from "react"

export const MoreProduct = ({p}) => {    
      const [isLoading, setIsLoading] = useState(true)

      return <div className="xxs:w-[200px] lg:w-[200px] xs:w-[180px] mobl:w-[200px] xl:w-[180px] transition-transform duration-100 ease-out transform hover:scale-[1.01]">
        <a href={`/product/${p.id}`}>
          <div className="relative">
          <img
          loading="lazy"
          className="object-cover rounded-t border object-bottom h-[200px] w-full"
          src={isLoading ? `${p.bigImg}?x-oss-process=image/format,webp,image/resize,m_fill,w_30,h_30` : `${p.bigImg}?x-oss-process=image/format,webp,image/resize,m_fill,w_179,h_190`}
          onLoad={(e) => setIsLoading(false)}
          alt={p.nameEn.substring(0, 60)}
        ></img>
          </div>
          <article itemScope itemType="https://schema.org/Product">
            <div>
            <div className="h-7">
            <span itemProp="price" className="text-[rgb(251,77,1)] font-bold xxs:text-[20px] text-sm">{p.sellprice}$</span></div>
            <h3
              className="xxs:text-base xs:text-sm text-gray-800 font-bold mobl:text-xs"
              itemProp="name"
            >
              {p.nameEn.substring(0, 100)}...
            </h3>
            </div>
            
          </article>
          </a>
        </div>
}