import star from "../../public/star.svg" 
import { Fragment, memo } from "react"

export const ReviewData = memo(({reviewData}) => {
    return <Fragment>
        {reviewData.content.map((review, i) => {
            return <div key={i} className="border-t mb-14">
                <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                        <p className="font-bold text-xs">{review.userName}</p>
                        <img width={21} height={16} src={review.flagUrlWeb} alt="flag"></img>
                        <p className="text-[6px] text-gray-700 font-semibold">{new Date(review.commentDate).toLocaleString("en-GB", {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                        }).replace(/\//g, '-')}</p>
                    </div>
                    <div className="flex sm:w-[200px] justify-between items-center">
                        <div className="flex">
                            {Array.from({ length: review.score }).map((a, i) => (
                                <img width={16} height={16} src={star} key={i} className="mx-[2px]" alt="review"></img>
                            ))}
                        </div>
                        <p className="text-xs xxs:hidden xs:block pl-3 font-semibold text-gray-600">{review.score} out of 5</p>
                    </div>
                </div>
                <p className="font-normal text-md mt-5 text-gray-800">{review.body}</p>
            </div>
        })}
    </Fragment>
})

ReviewData.displayName = "ReviewData"