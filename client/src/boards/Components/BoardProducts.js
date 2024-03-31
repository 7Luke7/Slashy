import { Fragment, memo } from "react"
import { BoardProduct } from "./BoardProduct"

export const BoardProducts = memo(({activities}) => {
      return <>
        {activities.map((activity, i) => {
          if (activity.sellPrice) {
            if (activity.sellPrice.includes('--')) {
                const sellPriceRange = activity.sellPrice.split('--');
                const newSellPriceMin = Number(sellPriceRange[0]) * 1.31;
                const newSellPriceMax = Number(sellPriceRange[1]) * 1.31;
                activity.sellPrice = newSellPriceMin.toFixed(2) + '--' + newSellPriceMax.toFixed(2);
            } else {
              activity.sellPrice = (Number(activity.sellPrice) * 1.31).toFixed(2);
            }
        }
          return <Fragment key={i}><BoardProduct activity={activity}></BoardProduct></Fragment>
      })}
    </>      
})