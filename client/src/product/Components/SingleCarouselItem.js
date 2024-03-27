import { memo } from "react";
import smallVideoPlayIcon from "../../public/smallVideoPlayIcon.svg" 

export const SingleCarouselItem = memo(({image, i, setCurr, curr}) => {
    return <div onClick={() => {
        setCurr({ imageURL: image, index: i });
    }} className="px-1 py-1 h-full relative w-full outline-none">
        {image && image.includes('.mp4') && <button className="w-7 h-7 outline-none rounded-full bg-[rgb(255,87,0)] z-50 opacity-50 flex justify-center items-center absolute top-1/2 bottom-1/2 left-1/2 right-1/2 -translate-y-1/2 -translate-x-1/2">
            <img loading="lazy" src={smallVideoPlayIcon} width={5} height={5} className="h-[24px] w-[24px]" alt="ჩართვა"></img>
        </button>}
        <img
            loading="lazy"
            className={`${i === curr.index && "outline outline-1 outline-[rgb(255,87,0)]"} xxs:border rounded object-contain h-full w-full`}
            src={image && image.includes('.mp4') ? `${image}?x-oss-process=video/snapshot,t_1,m_fast,w_80,h_80` : `${image}?x-oss-process=image/resize,m_pad,w_80,h_80`}
            alt={image && image.includes('.mp4') ? "ვიდეო" : "ფოტო"}
        />
    </div>
}) 