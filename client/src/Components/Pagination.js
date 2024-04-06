import { useSearchParams } from "react-router-dom";
import { useEffect,  useState, memo } from "react";
import ChevronDoubleRight from "../public/chevron-double-right.svg"
import ChevronDoubleLeft from "../public/chevron-double-left.svg" 
import ChevronRight from "../public/chevron-right.svg" 
import ChevronLeft from "../public/chevron-left.svg" 
import "../styles/pagination.css"

export const Pagination = memo(({page, total}) => {
    const [pageNumInput, setPageNumInput] = useState("")
    const [pageArray, setPageArray] = useState([...Array(5 + 1).keys()].slice(1))
    const [endSlice, setEndSlice] = useState(5);
    const [searchParams, setSearchParams] = useSearchParams()

    const allPages = Number(total);
    const numPage = Number(page);

    useEffect(() => {
      if (allPages < 5) {
        setPageArray([...Array(allPages + 1).keys()].slice(1));
        return setEndSlice(allPages);
      }
      if (numPage < 3) {
        setPageArray([...Array(5 + 1).keys()].slice(1));
        setEndSlice(5);
      } else if (numPage + 2 > allPages - 1) {
        const newPageArray = [...Array(5)].map((_, i) => allPages - 4 + i);
        setPageArray(newPageArray);
        setEndSlice(allPages);
      } else {
        setPageArray([...Array(5)].map((_, i) => numPage - 2 + i));
        setEndSlice(numPage + 2);
      }
    }, [numPage, allPages]);

    const navigateTo = (num) => {
      if(searchParams.has('page')) {
        searchParams.set('page', num);
      }
      if (!searchParams.has('page')) {
        searchParams.append('page', num);
      } 

      setSearchParams(searchParams);
    }

    const navigateForm = (e) => {
      e.preventDefault()
      if(searchParams.has('page')) {
        searchParams.set('page', pageNumInput);
      }
      if (!searchParams.has('page')) {
        searchParams.append('page', pageNumInput);
      } 

      setPageNumInput("")
      setSearchParams(searchParams);
    }


    return <nav className="h-10 sticky shadow-lg bg-white items-end bottom-0 left-1/2 z-50 w-full flex justify-center">
    <ul className="flex items-center justify-end space-x-2 xs:space-x-1 xxs:space-x-0">
    <div className="flex items-center">
    <button disabled={numPage === 1} onClick={() => navigateTo(pageArray[0])} className="p-1">
    <img decoding="lazy" width={15} height={15} alt={`now-${pageArray[0]}`} src={ChevronDoubleLeft} ></img>
  </button>
    <button disabled={numPage === 1} onClick={() => navigateTo(numPage - 1)} className="p-1">
    <img decoding="lazy" width={15} height={15} alt={`now-${numPage - 1}`} src={ChevronLeft} ></img>
  </button>
  </div>
      {pageArray.map((a, i) => {
        return <li key={i} className="flex justify-evenly p-1 items-start">
            <button onClick={() => navigateTo(a)} className={a === numPage ? "px-[4px] bg-[rgb(251,77,1)] text-white font-normal xxs:text-2xl lg:text-base" : "lg:text-base px-[4px] xxs:text-2xl text-gray-400 font-normal"}>
              {a}
            </button>
        </li> 
      })}
      <div className="flex gap-5 items-center">
      <div className="flex items-center">
      <button disabled={numPage === allPages ? true : false} onClick={() => navigateTo(numPage + 1)} className="p-1">
      <img decoding="lazy" alt={`now-${numPage + 1}`} width={15} height={15} src={ChevronRight} ></img>
    </button>
    <button onClick={() => navigateTo(endSlice)} disabled={numPage === allPages ? true : false} className="p-1">
    <img decoding="lazy" alt={`now-${endSlice}`} width={15} height={15} src={ChevronDoubleRight} ></img>
</button>
      </div>
  <form className="xxs:hidden md:flex" id="pagenum" onSubmit={navigateForm}>
      <label htmlFor="pagenum" className="text-xs font-noraml">At 
      <input type="number" min={1} max={allPages || ""} value={pageNumInput} onChange={(e) => setPageNumInput(e.target.value)} name="pagenum" id="pagenum" placeholder={page} className="w-7 h-7 font-normal text-sm text-center border"></input>
        from-{allPages}
       </label>
       <button type="submit" className="border text-xs w-7 h-7 bg-gray-50 text-[rgb(251,77,1)]">Go</button>
    </form>
      </div>
    </ul>
  </nav>
})

Pagination.displayName = "Pagination"