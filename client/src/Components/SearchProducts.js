import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from "../public/search.svg"

export const SearchProducts = () => {
    const [searchValue, setSearchValue] = useState("")
    const [suggestion, setSuggestion] = useState(null)
    const [currentKeyPos, setCurrentKeyPos] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        if (suggestion && suggestion.length > 0) {
            const removeSuggestion = () => {
                setSuggestion([]);
            }
                    
            document.addEventListener("click", removeSuggestion);
            
            if (window.innerWidth < 1024) {
                document.addEventListener("scroll", removeSuggestion);
            }
    
            return () => {
                document.removeEventListener("click", removeSuggestion);
                document.removeEventListener("scroll", removeSuggestion);
            };
        }
    }, [suggestion])

    const changeInput = async (inp) => {
        setSearchValue(inp)
        setCurrentKeyPos(null)
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

        setSearchValue("")
        setSuggestion([])
        navigate(`/search?page=1&keyword=${searchValue}`)
    }

    const handleKeyDown = (event) => {
        if (searchValue === "") return

        if (event.key === "Enter" && currentKeyPos != null) {
            setSearchValue("")
            navigate(`/search?page=1&keyword=${suggestion[currentKeyPos] || suggestion[0]}`)
            setSuggestion([])
        } 
       
        if (event.key === "ArrowUp") {
            setCurrentKeyPos((prev) => prev == null ? prev : prev === 0 ? suggestion.length - 1 : prev - 1)
        }  
        if (event.key === "ArrowDown") {
            setCurrentKeyPos(prev => prev == null ? 0 : suggestion.length - 1 !== prev ? prev + 1 : 0)
        }  
    }
    
    return <form onSubmit={search} onKeyDown={handleKeyDown} className={`xxs:hidden ${!suggestion || !suggestion.length ? "rounded-2xl" : "rounded-none"} sm:flex w-full flex-col flex-[5] sm:ml-3 relative lg:ml-2 justify-center bg-slate-50`}>
        <div className='flex justify-between items-center w-full'>
        <input type='text' lang="en-GB" value={searchValue} onChange={(e) => changeInput(e.target.value)} className={`md:text-base ${!suggestion || !suggestion.length ? "rounded-2xl" : "rounded-none"} sm:block p-2 w-full outline-none bg-slate-50`} placeholder='Search...' />
            <button type='submit' className='flex items-center px-2 bg-slate-50'>
                <img width={24} height={24} alt="search" src={Search}></img>
            </button>
        </div>
        {suggestion && suggestion.length > 0 && <main className='flex p-1 bg-slate-50 absolute flex-col top-0 w-full translate-y-[40px] justify-between'> 
        {suggestion.map((sug, i) => {
            return <a href={`/search?page=1&keyword=${sug}`} key={i} onMouseOver={() => setCurrentKeyPos(i)} className={`${i === currentKeyPos && "bg-slate-200"} rounded cursor-pointer p-1`} onClick={() =>  {
                    setSuggestion([])
                    setSearchValue("")
                }}>
                {sug}
            </a>
        })}
    </main>
    }
</form>
}