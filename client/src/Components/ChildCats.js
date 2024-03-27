import { Fragment } from "react";
import {SingleChildCat} from "./SingleChildCat"

export const ChildCats = ({catChild}) => {
    return <Fragment>
    {catChild.length > 0 && (
      <div className="bg-white border-b-2 border-gray-100 border-r-2 absolute top-0 bottom-0 left-0 right-0 z-[60]">
        <div className="bg-[rgb(251,77,1)] w-full h-[30px] p-2"></div>
        <menu className="flex flex-wrap" style={{ maxHeight: '480px', overflowY: 'auto' }}>
          {catChild.map((c, i) => (
            <Fragment key={i}>
              <SingleChildCat c={c}></SingleChildCat>
            </Fragment>
          ))}
        </menu>
      </div>
    )}
  </Fragment>
  
}