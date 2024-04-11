import { useEffect, useState } from 'react';
import Search from "../public/search.svg"
import { Link, useNavigate } from "react-router-dom";

export const MobileSearch = () => {
    const [searchValue, setSearchValue] = useState("")
    const [suggestion, setSuggestion] = useState([])

    const navigate = useNavigate()
    useEffect(() => {
        if (suggestion && suggestion.length > 0) {
            const removeSuggestion = () => {
                setSuggestion([]);
            }
                    
            document.addEventListener("click", removeSuggestion);
            document.addEventListener("scroll", removeSuggestion);
    
            return () => {
                document.removeEventListener("click", removeSuggestion);
                document.removeEventListener("scroll", removeSuggestion);
            };
        }
    }, [suggestion])

    const changeInput = async (inp) => {
        setSearchValue(inp)
        const request = await fetch("https://cjdropshipping.com/elastic-api/product/v1/suggester", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "omit",
            cache: "force-cache",
            body: JSON.stringify({"keyWord": inp}),
        })

        if (!request.ok) {
            throw new Error(request.statusText)
        }

        const data = await request.json()
        setSuggestion(data.data.suggesterList)
    }

    const search = (e) => {
        e.preventDefault()
        if(searchValue === "") {
            return
        }
     
        setSuggestion([])
        navigate(`/search?page=1&keyword=${searchValue}`)
        setSearchValue("")
    }

    const displayBar = () => {
        const closeScroll = document.getElementById("closeScroll")
        const catBar = document.getElementById("catBar")

        catBar.style.display = "block"        
        closeScroll.style.overflow = "hidden"
        closeScroll.style.position = "fixed"
    }

    return <form onSubmit={search} className="sm:hidden w-full m-auto items-center xxs:flex relative justify-between items-center bg-slate-50">
        <div className='flex justify-between items-center h-[40px] w-full'>
            <input type='text' value={searchValue} onChange={(e) => changeInput(e.target.value)} className='pl-3 outline-none w-full bg-slate-50' placeholder='Search...' />
            <button type='submit' className='p-3 sm:p-3 text-xl'>
                <img width={5} height={5} className="w-[24px] h-[24px]" alt="Search" src={Search}></img>
            </button>
        </div>
        {suggestion && suggestion.length > 0 && <ul className='flex absolute rounded-tr-none rounded-md rounded-tl-none flex-col pl-2 pt-1 top-0 bg-slate-50 shadow-2xl w-full translate-y-[40px] justify-between'> 
            {suggestion.map((sug, i) => {
                return <Link to={`/search?page=1&keyword=${sug}`} key={i} className="rounded p-1" onClick={() =>  {
                    setSearchValue("")
                    setSuggestion([])
                }}>
                {sug}
            </Link>
            })}
        </ul>
        }
    </form>
}