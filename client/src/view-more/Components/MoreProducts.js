import { Fragment } from "react"
import { MoreProduct } from "./MoreProduct"

export const MoreProducts = ({products}) => {
      return <>
        {products.map((product, i) => {
         if (product.sellprice) {
            if (product.sellprice.includes('--')) {
                const sellPriceRange = product.sellprice.split('--');
                const newSellPriceMin = Number(sellPriceRange[0]) * 1.50;
                const newSellPriceMax = Number(sellPriceRange[1]) * 1.50;
                product.sellprice = newSellPriceMin.toFixed(2) + '--' + newSellPriceMax.toFixed(2);
            } else {
              product.sellprice = (Number(product.sellprice) * 1.50).toFixed(2);
            }
        }
        return <Fragment key={i}><MoreProduct p={product}></MoreProduct></Fragment>
      })}
    </>      
}