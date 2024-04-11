import { Fragment } from "react"
import Close from "../public/x-lg.svg"
import {Link} from "react-router-dom"

export const MobCategoryBarUtil = ({closeBar}) => {
    return <div className='flex justify-between'>
    <Fragment>
        <Link to="/category" className='text-blue-500 underline'>Search category</Link>
    </Fragment>
    <button className='w-[24px] h-[24px]' onClick={closeBar}>
    <img src={Close} width={24} height={24} alt="დახურვა" decoding='lazy'></img>
</button>
    </div>
}