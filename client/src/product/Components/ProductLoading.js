import { Fragment } from "react";

export const ProductLoading = () => {    
    return <div className="h-full w-full mx-auto"> 
    <div className="xxs:w-[95%] mobl:w-[90%] lg:w-[90%] sm:w-[80%] mx-auto">
    <div className="flex xxs:hidden lg:flex sm:flex">
        {[1,2,3].map((a,i) => {
            return (
                <div key={i} className="flex items-center">
                    <div className="bg-gray-200 w-[80px] h-[10px] rounded animate-pulse"></div>
                    <span className="text-xs">\</span>
                </div>
            );
        })}
    </div>
    
    <div className="flex sm:gap-3 lg:gap-0 w-full lg:flex-row xxs:flex-col lg:h-full">
        <div className="flex xxs:w-full h-full rounded-t lg:w-[450px] flex-col">
            <div className="bg-gray-200 rounded-t animate-pulse xxs:w-full lg:w-[400px] xl:w-[450px] xxs:h-[400px] lg:h-[450px]"></div>
            <div className="xxs:h-[95px] lg:h-[60px] border p-1">
            </div>
        </div>
        <div className="flex xxs:mt-5 lg:mt-0 justify-between w-full lg:h-full lg:ml-8 flex-col">
        <div className="bg-gray-200 xxs:min-h-[30px] animate-pulse lg:min-h-[73px] w-full rounded"></div>
            <Fragment>
                {[1,2].map((a,i) => {
                    <div key={i} className="bg-gray-300 h-[30px] mt-1 rounded w-full animate-pulse"></div>
                })}
            </Fragment>
            <div className="flex h-full flex-col">
                <div className="flex xxs:flex-col gap-3 lg:flex-row mt-2 justify-between">
                
                <div className="xxs:flex xxs:flex-wrap md:flex-nowrap gap-3 w-full justify-between items-center">
                    <div className="flex items-center p-3 xxs:w-full border-[rgb(251,77,1)] justify-center rounded border border-gray-100">
                        <div className="h-[34px] w-[60px] rounded animate-pulse bg-gray-200"></div>
                    </div>
            
                    <div className="flex w-full h-[60px] rounded border border-gray-100">
                        <div className="border py-3 px-5 flex items-center justify-center border-gray-200 w-full">
                            <span className="font-normal">−</span>
                        </div>
                            <input type="text" className="lg:w-[50px] px-5 xxs:w-full xl:w-full border"></input>
                        <div  className="border py-3 px-5 flex items-center justify-center border-gray-200 w-full">
                            <span className="font-normal">+</span>
                        </div>
                    </div>
                    
                    <div className="flex rounded w-full h-full justify-center p-3 border-gray-100 border items-center">
                        <div className="w-[40px] animate-pulse h-[15px] rounded bg-gray-300"></div>
                    </div>
                </div>
                </div>
                
                <div className="flex flex-col gap-3 mt-3 mb-3 xxs:max-h-[300px] lg:h-[235px] justify-start">
                    <div className="flex flex-col gap-2 pt-2">
                        {[1,2,3].map((a, index) => {
                                return <Fragment key={index}>
                                <div className="bg-gray-300 h-[12px] w-[40px] rounded"></div>
                                <div className="pt-2">
                                    {[1].map((a, i) => {
                                        return <Fragment key={i}>
                                            {index === 0 ? <div className="h-[50px] w-[50px] rounded bg-gray-200 animate-pulse"></div> : <div className="bg-gray-300 h-[26px] w-[100px] rounded px-2 py-1 animate-pulse"></div> }
                                    </Fragment>
                                    })}  
                                </div>
                            </Fragment>
                            })
                        }
                    </div>
                </div>            
            <div className="w-full flex xxs:flex-col xxs:items-start sm:flex-row gap-3 sm:items-center lg:items-start mt-3 justify-between h-full lg:h-1/2">
            <div className="flex flex-col flex-[6] xl:justify-between h-full w-full gap-5">
                <div className="border bg-gray-200 xxs:w-full rounded px-4 xxs:h-[45px] lg:h-[40px]">
                </div>
                <div  className="bg-gray-200 w-full rounded xxs:h-[45px] lg:h-[40px] px-4"></div>
            </div>
            <div className="xxs:w-full lg:w-full flex-[6] xl:w-2/4 h-full px-3 gap-5 py-2 flex lg:h-[100px] flex-col border justify-between rounded border-gray-100">
                    <div className="w-[200px] bg-gray-200 h-[30px] rounded"></div>
                    <div className="flex mt-2 mobl:w-8/12 lg:w-10/12 xl:w-11/12 2xl:w-3/4 justify-between">
                    <div>
                        <div className="w-[50px] bg-gray-200 mb-[1px] h-[15px] rounded"></div>
                        <div className="bg-gray-200 rounded  w-[40px] h-[14px]"></div>
                    </div>
                    <div>
                        <div className="w-[80px] bg-gray-200 mb-[1px] h-[15px] rounded"></div>
                        <div className="w-[147px] rounded h-[14px] bg-gray-200"></div>
                    </div>
                </div>
            </div>
            </div>
            </div>
        </div>
        </div>
        </div>
        </div>
}