import { Fragment, memo } from "react"
import { SingleService } from "./SignleService"

export const BringService = memo(({changeLogistic, inventory, selectedLogistic}) => {
    return <div className={`mt-3 max-h-[400px] grid gap-6 ${inventory.length > 2 && "overflow-y-scroll overflow-x-none"}`}>
    {inventory.map((f, i) => {
        return <Fragment key={i}>
            <SingleService changeLogistic={changeLogistic} f={f} selectedLogistic={selectedLogistic}></SingleService>
        </Fragment>
    })}
    </div>
})