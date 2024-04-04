import { useState } from "react"

export const Product = ({product}) => {
    const [isLoading, setIsLoading] = useState(true)

    return <div className="xs:w-[150px] sm:w-[160px] md:w-[140px] mobl:w-[170px] xxs:w-[200px] lg:w-[140px] xl:w-[180px]  relative lg:hover:scale-[1.02]">
    <a href={`product/${product.productId}`}>
    <img
        loading="lazy"
        className="w-full rounded-tr-lg rounded-tl-lg outline outline-2 outline-gray-100 object-cover xxs:h-[200px] xs:h-[180px]"
        src={isLoading ? `${product.bigImg}?x-oss-process=image/format,webp,image/resize,m_fill,w_25,h_25` : `${product.bigImg}?x-oss-process=image/format,webp,image/resize,m_fill,w_179,h_190`}
        alt={product.nameEn.substring(0, 60)}
        onLoad={() => setIsLoading(false)}
        ></img>
        <article className="h-[80px]" itemScope itemType="https://schema.org/Product">
        <span itemProp="price" className="text-[rgb(251,77,1)] font-bold">{product.sellPrice || product.sellprice}$</span>
        <h3
            className="text-[12px] text-gray-600 font-bold"
            itemProp="name"
        >
            {product.nameEn.substring(0, 70)}...
        </h3>
        
        </article>
        </a>  
    </div>
}