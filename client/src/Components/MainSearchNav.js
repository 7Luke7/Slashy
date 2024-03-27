import { Fragment, memo } from "react"
import searchNav from "./searchNav.json"
import {SingleSearchNav} from "./SingleSearchNav"

export const MainSearchNav = memo(({setCatChild}) => {

    const MemoizedSingleSearchNav = memo(SingleSearchNav)
    return <menu className="h-[450px] rounded-br-none rounded-bl-lg border-2 border-t-0 border-gray-100 rounded-t-none">
          <ul className="flex flex-col space-y-[16px] p-2">
            {searchNav.map((cat, i) => {
              return <Fragment key={i}>
                <MemoizedSingleSearchNav cat={cat} setCatChild={setCatChild}></MemoizedSingleSearchNav>
              </Fragment>
            })}
          </ul>
        </menu>
})

MainSearchNav.displayName = 'MainSearchNav';