import Slider from "react-slick";
import LeftArrow from "../../public/arrow-left.svg" 
import RightArrow from "../../public/arrow-right.svg" 
import { Fragment, memo, useEffect, useMemo, useRef, useState } from "react";
import {SingleCarouselItem} from "./SingleCarouselItem"

export const MediaCarousel = memo(({product, curr, setCurr, id}) => {
    const [isMainLoading, setIsMainLoading] = useState(true)
    const [productImage, setProductImageSet] = useState([])
    
    const slider = useRef(null); 

    useEffect(() => {
          const slick_src = [
            "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css",
            "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          ]
      
          for (let i = 0; i < slick_src.length; i++) {
            const link = document.createElement("link")
      
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = slick_src[i]
      
            document.head.appendChild(link)
          }
        const fetch_media = async () => {
            const mainImageSet = product.newImgList
            try {
                if (product.isHaveVideo === "HAVE_VIDEO") {
                    const request = await fetch("https://m.cjdropshipping.com/product-api/businessVideo/selectVideoListByLocProductId", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        cache: "force-cache",
                        body: JSON.stringify({
                            locProductId: id
                        }),
                        credentials: "omit",
                    })
        
                    if (!request.ok) {
                        throw new Error(request.status);
                    }
        
                    const videoData = await request.json()
                    videoData.data.forEach((vl) => {
                        mainImageSet.unshift(vl.videoUrl)
                    })
                    setCurr({
                        imageURL: mainImageSet[0],
                        index: 0
                    })

                } else {
                    setCurr({
                        imageURL: mainImageSet[0],
                        index: 0
                    })
                }
                setProductImageSet(mainImageSet)

            } catch (error) {
                console.error(error)
            }
        }
        fetch_media()
    }, [product.isHaveVideo])

    useEffect(() => {
        slider.current && slider.current.slickGoTo(curr.index)
    }, [curr])

    const settings = useMemo(() => {
        return {
            speed: 200,
            infinite: productImage.length >= 7 ? true : false,
            slidesToShow: productImage.length >= 7 ? 7 : productImage.length,   
            swipe: true,
            adaptiveHeight: true,
            slidesToScroll: 1,
            arrows: false,  
            lazyLoad: true,
            swipeToSlide: 3,
            responsive: [
                {
                  breakpoint: 768,
                  settings: {
                    speed: 200,
                    swipe: true,
                    infinite: productImage.length >= 3 ? true : false,
                    slidesToShow: productImage.length >= 3 ? 3 : productImage.length,   
                    adaptiveHeight: true,
                    slidesToScroll: 1,
                    swipeToSlide: 2,
                    arrows: false,
                    lazyLoad: true,
                  }
                },
            ]
          
        }
    })

    return <Fragment>
        <div className="w-full lg:w-[400px] xl:w-[450px] h-full">
        {curr && curr.imageURL && curr.imageURL.includes(".mp4") ? <div className="relative outline-none w-full h-full">
            <video src={curr.imageURL} playsInline width={854} height={480} alt="Main video" autoPlay controls muted className="w-full xxs:h-[400px] lg:h-[450px] aspect-video object-contain object-center">
            </video>
        </div> 
        : Object.keys(curr).length > 0 ? <img 
            fetchpriority="high"
            alt="Main image"
            src={!isMainLoading ? `${curr.imageURL}?x-oss-process=image/resize,m_pad,w_${window.innerWidth < 768 ? 400 : 450},h_${window.innerWidth < 768 ? 400 : 450}` : `${curr.imageURL}?x-oss-process=image/resize,m_pad,w_100,h_100`}
            onLoad={() => {
                if (isMainLoading) {
                    setIsMainLoading(false)
                } else {
                    return
                }
            }}  
            className="w-full rounded-t xxs:h-[400px] lg:h-[450px] lg:w-[400px] xl:w-[450px] xxs:object-contain lg:object-cover">
        </img> : <div className="bg-gray-200 rounded-t lg:w-[400px] xl:w-[450px] xxs:h-[400px] lg:h-[450px]"></div>}
        </div>
        <div className="relative xxs:min-h-[100px] border-b-0 border-l-0 border-r-0 border lg:min-h-[60px] w-full">
            {productImage.length > 0 && 
                    <Fragment>
                        {window.innerWidth > 768 && settings.slidesToShow < productImage.length ? <>
                            <button onClick={() => slider.current.slickPrev()} className="absolute xxs:p-3 z-50 bg-[rgb(255,255,255,.9)] top-[1%] bottom-0 left-0 lg:p-1 sm:p-3">
                                <img src={LeftArrow} width={14} height={14} alt="prev" loading="lazy"></img>
                            </button>
                            <button className="absolute z-50 p-1 bg-[rgb(255,255,255,.9)] top-0 bottom-0 xxs:p-3 sm:p-3 lg:p-1 right-0" onClick={() => slider.current.slickNext()}>
                                <img src={RightArrow} width={14} height={14} alt="next" loading="lazy"></img>
                            </button>
                        </> : window.innerWidth < 768 && settings.responsive[0].settings.slidesToShow < productImage.length && <>
                            <button onClick={() =>  slider.current.slickPrev()} className="absolute xxs:p-3 z-50 bg-[rgb(255,255,255,.9)] top-[1%] bottom-0 left-0 lg:p-1 sm:p-3">
                                <img src={LeftArrow} width={14} height={14} alt="prev" loading="lazy"></img>
                            </button>
                            <button className="absolute z-50 p-1 bg-[rgb(255,255,255,.9)] top-0 bottom-0 xxs:p-3 sm:p-3 lg:p-1 right-0" onClick={() => slider.current.slickNext()}>
                                <img src={RightArrow} width={14} height={14} alt="next" loading="lazy"></img>
                            </button>
                        </>}
                    <Slider {...settings} ref={slider}>
                    {productImage.map((image, i) => (
                        <div className="pr-1 lg:h-[60px] xxs:h-[90px]" key={i}>
                        <SingleCarouselItem
                            image={image}
                            i={i}
                            setCurr={setCurr}
                            curr={curr}
                        />
                        </div>
                    ))}
                </Slider>
                </Fragment>
            }
        </div>
    </Fragment>
})

MediaCarousel.displayName = "MediaCarousel"