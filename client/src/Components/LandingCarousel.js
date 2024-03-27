import { memo, useRef, Fragment} from "react";
import Slider from "react-slick";
import LeftArrow from "../public/arrow-left.svg"
import RightArrow from "../public/arrow-right.svg"
import { SingleLandingCarousel } from "./SingleLandingCarousel";

export const LandingCarousel = memo(({carousel}) => {
    const slider = useRef(null);

    const settings = {
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      swipe: true,
      lazyLoad: true, 
    }

    return <Fragment>
    <Fragment>
          <button onClick={() =>  {
            if (carousel.length === 0) {
              return
            }
            slider.current.slickPrev()
          }} className="absolute shadow-xl z-40 -translate-y-2/4  bg-[rgb(255,255,255,.9)] top-1/2 left-[2%] p-1 rounded-[50%]">
          <img src={LeftArrow} width={10} height={10} alt="წინა" className="w-[36px] h-[36px]"></img>
        </button>
        <button className="absolute z-40 p-1 bg-[rgb(255,255,255,.9)] -translate-y-2/4 shadow-xl rounded-[50%] top-1/2 right-[2%]" onClick={() => {
          if (carousel.length === 0) {  
            return
          }
          slider.current.slickNext()
        }}>
            <img src={RightArrow} width={10} height={10} alt="შემდეგი" className="w-[36px] h-[36px]"></img>
        </button>  
      </Fragment>
    {carousel.length === 0 ? <div className="xxs:h-[200px] bg-gray-300 animate-pulse xs:h-[220px] md:h-[300px] sm:h-[260px] lg:h-[480px] w-full"></div> : 
    <Slider {...settings} ref={slider}>
        {carousel.map((slide, i) => {
          return <Fragment key={i}>
            <SingleLandingCarousel slide={slide}></SingleLandingCarousel>
          </Fragment>
        })}
      </Slider>
      } 
    </Fragment>
})

LandingCarousel.displayName = 'LandingCarousel';