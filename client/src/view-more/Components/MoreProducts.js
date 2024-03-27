import { Fragment } from "react"
import { MoreProduct } from "./MoreProduct"

export const MoreProducts = ({products}) => {
      return <>
        {products.map((product, i) => {
        return <Fragment key={i}><MoreProduct p={product}></MoreProduct></Fragment>
      })}
    </>      
}