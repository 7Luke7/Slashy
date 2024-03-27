import ChevronDoubleRight from "../../public/chevron-double-right.svg"
import ChevronDoubleLeft from "../../public/chevron-double-left.svg" 
import ChevronRight from "../../public/chevron-right.svg" 
import ChevronLeft from "../../public/chevron-left.svg" 
import {useMemo, useState} from "react"
import "../../styles/pagination.css"

export const ReviewPagination = ({page, setPage, allPages}) => {
    const [pageNumInput, setPageNumInput] = useState("")
    const [pageArray, setPageArray] = useState([...Array(5 + 1).keys()].slice(1))
    const [endSlice, setEndSlice] = useState(5);

    useMemo(() => {
        if (allPages < 5) {
          setPageArray([...Array(allPages + 1).keys()].slice(1));
          return setEndSlice(allPages);
        }
        if (page < 3) {
          setPageArray([...Array(5 + 1).keys()].slice(1));
          return setEndSlice(5);
        } else if (page + 2 > allPages - 1) {
          const newPageArray = [...Array(5)].map((_, i) => allPages - 4 + i);
          setPageArray(newPageArray);
          return setEndSlice(allPages);
        } else {
          setPageArray([...Array(5)].map((_, i) => page - 2 + i));
          return setEndSlice(page + 2);
        }
      }, [page, allPages]);

    return <nav className="h-10 border sticky shadow-lg bg-white items-end bottom-0 left-1/2 z-50 w-[100%] flex justify-center" aria-label="Navigation">
        <ul className="flex items-center justify-end">
        <li className="flex items-center">
        <button disabled={page === 1} onClick={() => {
            setPage(pageArray[0])
        }} className="p-1 text-gray-400">
        <img width={15} height={15} loading="lazy" alt={`at-${pageArray[0]}`} src={ChevronDoubleLeft} ></img>
        </button>
            <button disabled={page === 1} onClick={() => {
                setPage(p => p - 1)
            }} className="p-1 text-gray-400">
            <img width={15} height={15} loading="lazy" alt={`at-${page - 1}`} src={ChevronLeft} ></img>

        </button>
        </li>
        {pageArray.map((a, i) => {
            return <li key={i} className="flex justify-evenly p-1 items-start">
                <button onClick={() => {
                    setPage(a)
                }} className={a === page ? "px-[4px] bg-[rgb(251,77,1)] text-white font-normal xxs:text-2xl lg:text-base" : "lg:text-base px-[4px] xxs:text-2xl text-gray-400 font-normal"}>
                    {a}
                </button>
            </li> 
        })}
            <li className="flex gap-5 items-center">
            <div>
            <button disabled={page === allPages ? true : false} onClick={() => {
                setPage(p => p + 1)
            }} className="p-1 text-gray-400">
            <img width={15} height={15} loading="lazy" alt={`at-${page + 1}`} src={ChevronRight} ></img>

            </button>
            <button onClick={() => {
                setPage(endSlice)
            }} disabled={page === allPages ? true : false} className="p-1 text-gray-400">
            <img width={15} height={15} loading="lazy" alt={`at-${endSlice}`} src={ChevronDoubleRight} ></img>
        </button>
            </div>
            
        <form className="xxs:hidden md:flex" onSubmit={(e) => {
            e.preventDefault()
            setPage(Number(pageNumInput))
        }}>
            <label htmlFor="pagenum" className="text-xs font-[300]" id="page_navigation_caption">At 
            <input type="number" onChange={(e) => setPageNumInput(e.target.value)} id="page_navigation_caption" placeholder={page} min={1} max={allPages} className="w-7 h-7 outline-none font-medium text-sm text-center border"></input>
                From-{allPages}
            </label>
            <button type="submit" className="border text-xs w-7 h-7 bg-gray-50 text-[rgb(251,77,1)]">Go</button>
            </form>
            </li>
            </ul>
        </nav>
}