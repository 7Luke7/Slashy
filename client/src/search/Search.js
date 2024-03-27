import { Filter } from "../Components/Filter"
import { Footer } from "../Components/Footer"
import { Header } from "../Components/Header"
import Close from "../public/x-lg.svg"
import {SearchProducts} from "./Components/SearchProducts"
import { useSearchParams } from "react-router-dom"

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const countryCode = searchParams.get("countryCode") || ""
    const isVideo = searchParams.get("productType") || ""
    const maxInput = searchParams.get("endSellPrice") || ""
    const minInput = searchParams.get("startSellPrice") || ""
    const category_id = searchParams.get("category")
    const keyword = searchParams.get("keyword") || ""
    const page = searchParams.get("page")  
    const isAsc = Number(searchParams.get('isAsc'))
    const fieldType = Number(searchParams.get('fieldType')) || null
    
    const handlesort = (e) => {
      if (e === "asc") {
        if(searchParams.has('isAsc')) {
          searchParams.set('isAsc', 1); 
        }
        if (!searchParams.has('isAsc')) {
          searchParams.append('isAsc', 1);
        } 

      } else if (e === "desc") {        
        if(searchParams.has('isAsc')) {
          searchParams.set('isAsc', 0);
        }
        if (!searchParams.has('isAsc')) {
          searchParams.append('isAsc', 0);
        } 

      } else {
        searchParams.delete("isAsc")
        searchParams.delete("fieldType")
        
        return setSearchParams(searchParams)
      }

      if (!searchParams.has("fieldType")) {
        searchParams.append("fieldType", 2)
      }
      if (searchParams.has("fieldType")) {
        searchParams.set("fieldType", 2)
      }

      searchParams.set("page", 1)
      setSearchParams(searchParams)
    }

    const bestMatch = () => {
      if (!keyword) {
        return  
      }
      if (searchParams.has("fieldType")) {
        searchParams.set("fieldType", 0)
      }
      if (!searchParams.has("fieldType")) {
        searchParams.append("fieldType", 0)
      }
      if (searchParams.has("isAsc")) {
        searchParams.delete("isAsc")
      }
      setSearchParams(searchParams)
    }

    const newProduct = () => {
      if (searchParams.has("fieldType")) {
        searchParams.set("fieldType", 3)
      }
      if (!searchParams.has("fieldType")) {
        searchParams.append("fieldType", 3)
      }
      if (searchParams.has("isAsc")) {
        searchParams.delete("isAsc")
      }
      setSearchParams(searchParams)
    }

    return <section className="relative min-h-screen">
        <div id="mobile_filter_component" className='fixed overflow-y-scroll z-[1000] left-0 h-screen bg-white right-0 top-0 bottom-0 -transform-translate-x-[100%] duration-200'>
            <button className='absolute right-5 top-3' onClick={() => 
            {
              document.getElementById("mobile_filter_component").style.display = "none"
              const closeScroll = document.getElementById("closeScroll")
              closeScroll.style.overflow = "visible";
              closeScroll.style.position = "relative"
            }
          }>
            <img src={Close} width={24} height={24} alt="close menu" decoding='lazy'></img>
            </button>
          <div className="mt-20">
            <Filter isVideo={isVideo} countryCode={countryCode} minInput={minInput} maxInput={maxInput}></Filter>
          </div>
      </div>
        <Header></Header>
        <div id="closeScroll" className="flex flex-col justify-between m-auto">

        <div className="md:mt-14 flex flex-col lg:w-[95%] m-auto">
  
          <div className="flex justify-between sm:flex-row xxs:flex-col xxs:items-center">
              <div  className="flex flex-wrap sm:gap-2 xxs:gap-1 xxs:justify-center sm:justify-end mt-5 w-full text-xs items-start">
                <button onClick={newProduct} className={`rounded ${fieldType === 3 && "border-[rgb(251,77,1)]"} w-[135px] border p-2`}>Newest</button>
                {keyword !== "" && <button onClick={bestMatch} className={`rounded ${fieldType == null && "border-[rgb(251,77,1)]"} w-[130px] border p-2`}>Best Match</button>}
                <select value={fieldType === 3 || fieldType === 0 || fieldType == null ? "დალაგება" : fieldType === 2 && isAsc === 1 ? "asc" : "desc"} onChange={(e) => handlesort(e.target.value)} className={`border ${isAsc === 1 || isAsc === 2 && "border-[rgb(251,77,1)]"} xxs:w-[130px] xs:w-[140px] lg:w-[150px] xxs:p-2 rounded`}>
                  <option value="დალაგება">{!fieldType && !isAsc  ? "Featured" : "Featured"}</option>
                  <option value="desc">Price: Descending</option>
                  <option value="asc">Price: Ascending</option>
                </select>
              </div>
          </div>
          <div className="xxs:w-[200px] pb-3 pt-10 m-auto xxs:block lg:hidden">
          <button onClick={() => {
            document.getElementById("mobile_filter_component").style.display = "block"
            const closeScroll = document.getElementById("closeScroll")
            closeScroll.style.overflow = "hidden"
            closeScroll.style.position = "fixed"
          }} className="text-sm rounded w-full bg-[rgb(251,77,1)] p-2 text-white">Filter</button>
        </div>
            <div className="flex mt-5">
            <div className="xxs:hidden relative lg:block flex-1">
            <Filter isVideo={isVideo} countryCode={countryCode}></Filter>
          </div>
            <SearchProducts category_id={category_id} page={page} isVideo={isVideo} isAsc={isAsc} fieldType={fieldType} countryCode={countryCode} keyword={keyword} minInput={minInput} maxInput={maxInput}></SearchProducts>
            </div>
        </div>
        </div>
        <div className="mt-20">
        <Footer></Footer>
        </div>
    </section>
}

export default Search