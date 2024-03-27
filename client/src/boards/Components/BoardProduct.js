import { useState } from "react"

export const BoardProduct = ({activity}) => {
    const [isLoading, setIsLoading] = useState(true)

    return <div className="xxs:w-[200px] lg:w-[200px] mt-4 xs:w-[180px] mobl:w-[200px] xl:w-[180px] lg:hover:outline lg:hover:outline-1 lg:hover:outline-gray-400">
      <a href={`/product/${activity.id}`}>
          <div className="relative">
          <img
          loading="lazy"
          className="object-cover border w-full rounded-t xxs:h-[215px] xs:h-[245px] lg:h-[195px] m-0 p-0 object-center"
          src={isLoading ? `${activity.bigImage}?x-oss-process=image/format,webp,image/resize,m_fill,w_30,h_30` : `${activity.bigImage}?x-oss-process=image/format,webp,image/resize,m_fill,w_179,h_190`}
          alt={activity.nameEn.substring(0, 60)}
          onLoad={() => setIsLoading(false)}
      ></img>
          </div>
          <article itemScope itemType="https://schema.org/Product">
              <div className="h-7">
                  <span itemProp="price" className="text-[rgb(251,77,1)] font-bold xxs:text-[20px] text-sm">{activity.sellPrice}$</span>
              </div>
                  <h1
                      className="xxs:text-base xs:text-sm text-gray-800 font-bold mobl:text-xs"
                      itemProp="name"
                  >
                      {activity.nameEn.substring(0, 100)}...
                  </h1>
          
          </article>
      </a>
</div>
}