import { useState, Fragment} from "react"

export const RecomProducts = ({product, i}) => {
    const [isLoading, setIsLoading] = useState(true)

    return <div key={i} className="xxs:w-[220px] lg:w-[200px] xs:w-[180px] mobl:w-[160px] xl:w-[200px] lg:hover:scale-[1.01]">
    <a href={`/product/${product.productId}`}>
      <div className="relative">
      <img
      loading="lazy"
      className="object-cover rounded-t border w-[200px] h-[200px]"
      src={isLoading ? `${product.bigImg}?x-oss-process=image/format,webp,image/resize,m_fill,w_30,h_30` : `${product.bigImg}?x-oss-process=image/format,webp,image/resize,m_fill,w_179,h_190`}
      onLoad={() => {
        setIsLoading(false)
      }}
      alt={product.nameEn.substring(0, 60)}
    ></img>
      </div>
      <article className="min-h-[80px]" itemScope itemType="https://schema.org/Product">
        <Fragment>
        <div className="h-7">
        <span itemProp="price" className="text-[rgb(251,77,1)] font-bold xxs:text-[20px] text-sm">{product.sellPrice}$</span>
        </div>
        <h1
          className="xxs:text-base xs:text-sm text-gray-700 font-bold mobl:text-xs"
          itemProp="name"
        >
          {product.nameEn.substring(0, 50)}...
        </h1>
        </Fragment>
        
      </article>
      </a>
    </div>
}