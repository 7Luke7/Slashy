import { Fragment, memo } from "react"
import { BoardProduct } from "./BoardProduct"

export const BoardProducts = memo(({activities}) => {
      return <>
        {activities.map((activity, i) => {
          return <Fragment key={i}><BoardProduct activity={activity}></BoardProduct></Fragment>
      })}
    </>      
})