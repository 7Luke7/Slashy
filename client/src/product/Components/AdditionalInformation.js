import { Fragment, memo, useEffect, useState } from "react"
import { ReviewLoading } from "./ReviewLoading"
import { ReviewData } from "./ReviewData"
import {ReviewPagination} from "./ReviewPagination"
    
export const AdditionalInformation = memo(({id, product}) => {
    const [reviewsChoosen, setReviewsChoosen] = useState(false)
    const [page, setPage] = useState(null)
    const [reviewData, setReviewData] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        if (!page) {
            return
        }
        const fetch_reviews = async () => {
            try {
                const request_reviews = await fetch("https://cjdropshipping.com/product-api/product/comment/commentPageV201", {
                    method: "POST",
                    credentials: "omit",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        pageNumber: page,
                        pageSize: 10,
                        score: 4,
                        productId: id,
                    }),
                });
                    
                if (!request_reviews.ok) {
                    throw Error("We encountered an error while fetching recommended products. try later.");
                } 
                
                const review_data = await request_reviews.json();
    
                setReviewData(review_data.data)
            } catch (error) {
                setError(error.message);
            }
        }

        fetch_reviews()
    }, [page, id])

    const allPages = Number(reviewData && reviewData.totalPages);

    return <div className="mt-24 xxs:w-[90%] sm:w-[80%] m-auto">
    <div className="text-center">
        <button onClick={() => setReviewsChoosen(false)} className={` ${!reviewsChoosen && "bg-[rgb(255,128,64)]"} border border-[rgb(255,128,64)] outline-none text-xs gap-3 text-black font-bold p-2 w-24 text-center`}>Description</button>
        <button onClick={() => {
            if (page > 1) {
                return
            }
            setPage(1)
            setReviewsChoosen(true)
        }} className={` ${reviewsChoosen && "bg-[rgb(255,128,64)]"} border border-[rgb(255,128,64)] text-xs gap-3 outline-none text-black font-bold p-2 w-24 text-center`}>Reviews</button>      
    </div>
    {reviewsChoosen && error ?  <h1 className="text-gray-900 mt-5 text-center">{error}</h1> : reviewsChoosen && !error ? <div className="flex flex-col xxs:mt-10 sm:m-20">
        {reviewData && reviewData.totalRecords !== "0" && <p className="text-md font-bold mb-5">Reviews: {reviewData.totalRecords}</p>}
        {!reviewData ? <ReviewLoading></ReviewLoading> : reviewData && reviewData.content.length != 0 ? <Fragment>
            <ReviewData reviewData={reviewData}></ReviewData>
            <ReviewPagination page={page} setPage={setPage} allPages={allPages}></ReviewPagination> 
        </Fragment>: <p className="text-md p-0 m-0 text-center text-gray-900 font-semibold">Reviews are empty.</p>}
        </div> : <div className="mt-5 overflow-wrap break-all" dangerouslySetInnerHTML={{__html: product.DESCRIPTION}}></div>}
    </div>
})

AdditionalInformation.displayName = "AdditionalInformation"