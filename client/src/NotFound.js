import { Fragment } from 'react'
import {Header} from "./Components/Header" 
import {Footer} from "./Components/Footer" 
import not_found from "./public/not_found.svg"

export default function NotFound() {
  return (
    <Fragment>
    <Header></Header>
      <img src={not_found} alt="Page not found" className='w-full border xxs:h-[500px] lg:h-[550px]'></img>
      <div className='justify-center flex-col flex items-center mb-5 gap-2'>
        <h2 className='font-bold text-lg'>Page not found.</h2>
        <button onClick={() => window.history.back()} className='bg-[rgb(252,112,55)] text-white font-semibold text-md rounded px-3 py-2 w-[160px]'>Go back</button>
      </div>
      <Footer></Footer>
    </Fragment>
  )
}