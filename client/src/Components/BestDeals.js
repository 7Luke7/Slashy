import { useEffect, useState } from "react";
import {ProductListings} from "./ProductListings.js"
import bestdeals from "../public/trophy-star.svg"

const BestDeals = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetch_best_deals = async () => {
      try {
        const request = await fetch("https://cjdropshipping.com/elastic-api/cj/homePage/getTop5UnsoldProduct", {
          method: "POST",
          credentials: "omit",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "pageSize": "10"
          }),
        })
        
        const data = await request.json()

        if (!request.ok) {
          throw new Error(request.data);
        }

        setProducts(data.result)
      } catch (error) {
        console.log(error);
      }
    }
    fetch_best_deals()
  }, [])

  return <div id="best_deals" className="relative mt-14 w-[100%] m-auto">
  <div className="bg-[rgb(230,230,230,.2)] p-4 rounded-2xl">
  <div className="md:mx-5 lg:mx-2 xl:mx-5">
  <div className="flex gap-2 items-center">
      <h1 className="xxs:text-md md:text-lg text-gray-900 font-bold">
        Best Deals
      </h1>
      <img loading="lazy" className="xxs:hidden xs:block" src={bestdeals} alt="deals"></img>
    </div>
  </div>
    <ProductListings products={products}></ProductListings>
  </div>  
</div>
}

export default BestDeals
BestDeals.displayName = 'BestDeals';