export const ReviewLoading = () => {
    return Array.from({length: 1}).map((a, i) => {
        return <div key={i} className="border-t mt-10 animate-pulse">
        <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
                <div className="h-[17px] w-[30px] bg-gray-200 rounded"></div>
                <div className="bg-gray-200 rounded w-[21px] h-[16px]"></div>
                <div className="bg-gray-200 w-[60px] h-[10px] rounded"></div>
            </div>
            <div className="flex w-[200px] xxs:justify-end xs:justify-between items-center">
                <div className="bg-[rgb(255,128,64)] h-[18px] w-[100px] rounded"></div>
                <div className="rounded h-[18px] w-[50px] bg-gray-200 xxs:hidden xs:block"></div>
            </div>
        </div>
        <p className="rounded mt-5 h-[70px] bg-gray-200"></p>
    </div>
    })
}