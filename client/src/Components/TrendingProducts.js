import { memo, useEffect, useState } from "react";
import { ProductListings } from "./ProductListings";
import Fire from "../public/fire-flame-curved.svg"
import { Link } from "react-router-dom";

export const TrendingProducts = memo(() => {
  const [trendingProducts, setTrendingProducts] = useState([]) 

  useEffect(() => {
    const fetch_trending_products = async () => {
      try {
        const request = await fetch("https://cjdropshipping.com/elastic-api/cj/homePage/v2/selectNewProductList", {
            method: "POST",
            credentials: "omit",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "pageSize": 10,
                timeFlag: "Dropshipping"
            }),
        })
        const data = await request.json()

        if (!request.ok) {
          throw new Error(request.data);
        }    

        setTrendingProducts(data.result)
      } catch (error) {
        console.log(error);
      }
    }
    
    fetch_trending_products()
  }, [])

  return <div className="relative mt-14 w-full m-auto">
    <div className="bg-[rgb(230,230,230,.2)] p-4 rounded-2xl">
    <div className="md:mx-5 lg:mx-2 xl:mx-5 flex justify-between items-center">
    <div className="flex gap-2 items-center">
      <h2 className="xxs:text-md md:text-lg text-gray-900 font-bold">
        Trending Products
      </h2>
      <img loading="lazy" className="xxs:hidden xs:block" src={Fire} alt="trend"></img>
    </div>
  <Link to="/view-more/2" className="text-blue-500 underline text-xs">View more</Link>
    </div>
      <ProductListings products={trendingProducts}></ProductListings>
    </div>  
</div>
})

TrendingProducts.displayName = 'TrendingProducts';