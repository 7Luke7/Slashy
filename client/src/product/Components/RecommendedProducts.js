import { Fragment, useMemo, useEffect, useState, memo } from "react"
import { RecomProducts } from "./RecomProducts"

const RecommendedProducts = memo(({id}) => {
    const [recommendedProducts, setRecommendedProducts] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        const get_recommended_products = async () => {
            try {
              const request = await fetch("https://m.cjdropshipping.com/elastic-api/recommend/search/productDetail/queryPage", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  credentials: "omit",
                  body: JSON.stringify(
                      {
                        page: 1, 
                        size: "12",
                        versionNum: null,
                        productId: id
                      },
                  )
                })
              
                if (!request.ok) {
                  throw new Error("We encountered an error while fetching recommended products. try later.");
                }

                const data = await request.json()

                setRecommendedProducts(data.data.content)
            } catch (error) {
                setError(error.message);
            }
            
        }   
        get_recommended_products()
    }, [id])

    const render = useMemo(() => {
      if (!recommendedProducts) { 
        return <section className="mt-10">
        <div className="flex xxs:justify-center lg:justify-start">
            <div className="w-[200px] h-[25px] rounded bg-gray-200 animate-pulse"></div>          
        </div>
            <div className="lg:grid-cols-4 xl:grid-cols-5 w-full gap-2 place-items-center xxs:grid mt-5 md:grid-cols-3 mobl:grid-cols-2">
                {Array.from({length: 12 }).map((_, index) => {
                    return <div key={index} className="animate-pulse xxs:w-[200px] lg:w-[200px] mobl:w-[170px] xs:w-[230px] xl:w-[200px]">
                    <Fragment>
                    <div
                    className="bg-gray-300 w-full h-[200px]"
                ></div>
                    </Fragment>
                    <Fragment>
                    <Fragment>
                    <div className="h-[22px] mt-1 mb-3 rounded w-1/2 bg-[rgb(251,77,1)]"></div>
                    <div
                        className="h-[30px] mt-4 mb-2 w-full bg-gray-400 rounded"
                    >
                    </div>
                    </Fragment>
                    </Fragment>
                </div>
                })}      
            </div>
        </section>
      } else {
        return <section className="mt-10">
            {error ? <h1 className="text-center text-gray-900">{error}</h1> : <Fragment>
            <p className="text-lg xxs:text-center lg:text-start">Recommended Products</p>
    <div className="lg:justify-between xxs:justify-evenly gap-y-4 flex-grow flex flex-wrap mt-5">
      {recommendedProducts && recommendedProducts.map((product, i) => {
          return <Fragment key={i}><RecomProducts product={product} i={i}></RecomProducts></Fragment>
        })}
    </div>
                </Fragment>}
    </section>
      }
    }, [recommendedProducts])

    return render
})

export default RecommendedProducts
RecommendedProducts.displayName = "RecommendedProducts"