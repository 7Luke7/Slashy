import { useState } from "react"
import { Link } from "react-router-dom"

export const SingleLandingCarousel = ({slide}) => {
    const [isLoading, setIsLoading] = useState(true)
  return <div className="xxs:h-[200px] xs:h-[220px] md:h-[300px] sm:h-[260px] lg:h-[480px] w-full">
  <Link to={`/boards/${slide.urlOrSku.split("=")[1]}`}>
  <img
      src={isLoading ? `${slide.webImg}?x-oss-process=image/resize,m_fill,w_120,h100` : window.innerWidth <= 430 && isLoading ? `${slide.webImg}?x-oss-process=image/resize,m_fill,w_25,h25` : window.innerWidth <= 430 ? `${slide.webImg}?x-oss-process=image/resize,m_fill,w_320,h_240` : window.innerWidth > 430 && `${slide.webImg}?x-oss-process=image/resize,m_fill,w_800,h_437`}
      className="object-cover h-full w-full"
      fetchpriority="high"
      onLoad={() => {
        setIsLoading(false)
      }}
      alt="Carousel image"
    ></img>
    </Link>  
  </div>  
} 