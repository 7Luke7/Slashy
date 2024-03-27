export const BringServiceLoading = () => {
    return <div className="mt-3 grid gap-6">
     <div className="relative">
    <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 border-[rgb(255,128,64)] rounded-full border-8"></span>
    <div className="border-2 bg-gray-50 border-[rgb(255,144,80)] flex rounded-lg border p-4">
        <div className="ml-5 flex flex-col gap-2">
        <span className="mt-2 w-[120px] bg-gray-800 rounded h-[17px]"></span>
        <p className="w-[80px] bg-gray-500 rounded h-[13px]"></p>
        <p className="w-[60px] bg-gray-500 rounded h-[13px]"></p>
        </div>
    </div>
    </div>
    </div>
}