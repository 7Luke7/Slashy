export const Variants = ({v, i, pv, index, changeVarientArr, setVarientList}) => {
    return <>
        {pv.name.includes("Color") ? <button disabled={v.disable} onClick={() => changeVarientArr(v, i, pv, setVarientList, index)} className={`border-2 ${v.chosen && "border-[rgb(255,87,0)]"} duration-200 outline-none rounded ${v.disable && "opacity-[0.33]"}`}>
            <img alt="variant"
              disabled={v.disable}
              className="h-[50px] w-[50px] object-cover rounded"
              loading="lazy"
              src={`${v.img}?x-oss-process=image/resize,m_fill,w_80,h_80`}>
            </img>
            </button> : <button disabled={v.disable} onClick={() => changeVarientArr(v, i, pv, setVarientList, index)} className={`border-2 ${v.chosen && "border-[rgb(255,87,0)]"} duration-200 ${v.disable && "opacity-[0.3]"} outline-none px-2 py-1 rounded`}>
        <p className="font-semibold text-gray-800 text-[13px]">{v.eng_name}</p>
    </button>}
    </>
} 