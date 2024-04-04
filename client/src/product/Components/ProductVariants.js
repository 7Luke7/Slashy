import { Fragment, memo, useEffect, useState } from "react";
import { Variants } from "./Variants";

export const ProductVariants = memo(({changeVarientArr, product}) => {
    const [varientList, setVarientList] = useState()

    useEffect(() => {
        const manipulate_variants = async () => {
            try {
                const productDtl = product;
                const stanProducts = productDtl.stanProducts
            
                const varientArr = []   
                const oriColorMap = {};
                const varientKeys = productDtl.VARIANTKEYEN.split("-")

                for (let i = 0; i < varientKeys.length; i++) {
                    varientArr.push({
                        name: varientKeys[i],
                        key: []
                    });
                }

                for (let i = 0; i < stanProducts.length; i++) {
                    stanProducts[i].SELLPRICE = (Number(stanProducts[i].SELLPRICE) * 1.31).toFixed(2);
                    if (stanProducts[i].VARIANTKEY != null) {
                    const curVarientVal = stanProducts[i].VARIANTKEY.split('-');

                        for (let j = 0; j < curVarientVal.length; j++) {
                            if (varientArr[j] && !varientArr[j].key.includes(curVarientVal[j])) {
                                varientArr[j].key.push(curVarientVal[j]);
                                oriColorMap[curVarientVal[j]] = stanProducts[i].IMG;
                            }                    
                        }
                    }
                }
                
                for (let i = 0; i < varientArr.length; i++) {
                    varientArr[i].keyObj = [];
                    for (let j = 0; j < varientArr[i].key.length; j++) {
                        varientArr[i].keyObj.push({
                            eng_name: varientArr[i].key[j],
                            disable: false,
                            img: oriColorMap[varientArr[i].key[j]]
                        });
                    }
                }
                
                setVarientList(varientArr)
            } catch (error) {
                console.error(error)
            }
        }

        manipulate_variants()
    }, [product])

    return <div className="flex flex-col gap-2 mt-3 mb-3 xxs:max-h-[300px] lg:h-[235px] overflow-y-scroll overflow-x-none justify-start">
    {varientList && varientList.map((pv, index) => {
        return <Fragment key={index}>
            <h4 className="text-xs text-gray-900 font-semibold">{pv.name}</h4>
            <div className="gap-2 flex flex-wrap">
            {pv.keyObj.map((v, i) => {
                return <Fragment key={i}>
                    <Variants v={v} i={i} pv={pv} index={index} setVarientList={setVarientList} changeVarientArr={changeVarientArr}></Variants>  
                </Fragment>
            })}
            </div> 
        </Fragment>
    })}
    
</div>
})

ProductVariants.displayName = "ProductVariants"