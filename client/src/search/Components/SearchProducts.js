import { Fragment, useEffect, useMemo, useState } from "react"
import {SearchProduct} from "./SearchProduct"
import {Pagination} from "../../Components/Pagination"
import categoryNames from "../../Components/searchNav.json"
import mainLogo from "../../public/slashy_logo.webp"
import {Helmet} from "react-helmet-async" 

export const SearchProducts = ({category_id, page, isVideo, isAsc, fieldType, countryCode, keyword, minInput, maxInput}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState()
    
    useEffect(() => {   
      setIsLoading(true)
      const fetch_products = async () => {
          document.getElementById("mobile_filter_component").style.display = "none"
          try {
              const request = await fetch("https://m.cjdropshipping.com/elastic-api/product/v4/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "omit",
                body: JSON.stringify({
                  "page": page, 
                  "size": 30,
                  "categoryId": category_id,
                  "startSellPrice": minInput,
                  "endSellPrice": maxInput,
                  "countryCode": countryCode,
                  "keyWord": keyword, 
                  "productType": isVideo, 
                  "sortByParam": {
                      "feildType": fieldType,
                      "isAsc": isAsc
                  }
                }),
            })

            const data = await request.json();
            
            setProducts(data.data);
            setIsLoading(false)
          } catch (error) {
              console.error("Error fetching data:", error);
          }
      };
        
      fetch_products();
    }, [category_id, page, isVideo, isAsc, fieldType, countryCode, keyword, minInput, maxInput])

      const keywords = useMemo(() => {
        const keyword_array = []
        categoryNames.filter((parentCatName) => {
          if (parentCatName.id === category_id) {
            for (let i = 0; i < parentCatName.children.length; i++) {
              keyword_array.push(parentCatName.children[i].nameEn)
            }
            keyword_array.push(parentCatName.nameEn)
          } else {
              parentCatName.children.filter((childCatName) => {
                  if (childCatName.id === category_id) {
                    for (let i = 0; i < childCatName.children.length; i++) {
                      keyword_array.push(childCatName.children[i].nameEn)
                    }
                    keyword_array.push(childCatName.nameEn)
                  } else {
                      childCatName.children.filter((subChildCatName) => {
                          if (subChildCatName.id === category_id) {
                            for (let i = 0; i < subChildCatName.children.length; i++) {
                              keyword_array.push(subChildCatName.children[i].nameEn)
                            }
                            keyword_array.push(subChildCatName.nameEn)
                          } else {
                              subChildCatName.children.filter((subSubChildrenCatName) => {
                                  if (subSubChildrenCatName.id === category_id) {
                                    for (let i = 0; i < subSubChildrenCatName.children.length; i++) {
                                      keyword_array.push(subSubChildrenCatName.children[i].nameEn)
                                    }
                                    keyword_array.push(subSubChildrenCatName.nameEn)
                                  }
                              })
                          }
                      })
                  }
              })
          }
        })
    
      return keyword_array.join(', ');
      }, [category_id])

      const productListLength = products && products.content[0].productList.length
    const render = useMemo(() => {
        if (isLoading) {
            return <Fragment>
                  <div className="flex gap-y-2 gap-x-1 flex-wrap xxs:justify-center lg:justify-between">
                  {Array.from({length: 30 }).map((_, index) => {
                  return <div key={index} className="animate-pulse xxs:w-[220px] lg:w-[200px] xs:w-[180px] mobl:w-[160px] xl:w-[200px]">
              <Fragment>
              <div
              className="bg-gray-300 rounded-t w-full h-[200px]"
            ></div>
              </Fragment>
              <Fragment>
                <Fragment>
                <div className="h-[22px] mt-1 mb-3 rounded w-1/2 bg-[rgb(251,77,1)]"></div>
                <div
                  className="h-[26px] mt-4 mb-2 w-full bg-gray-400 rounded"
                >
                </div>
                </Fragment>
              </Fragment>
            </div>
              })}
                  </div>
              {productListLength > 0 && <Pagination page={page} total={products.totalPages}></Pagination>}
            </Fragment>
      } else if (productListLength > 0) {
        return <Fragment> 
          <Helmet>
        <meta
          name="description"
          content={keyword ? `Search ${keyword} - Best prices - Slashy.shop` : `${keywords} - Best prices - Slashy.ge`}
        />
        <meta
          name="keywords"
          content={keywords}
        />
        <link rel="canonical" href={window && window.location.href} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={keyword ? `Search ${keyword} - Slashy.shop` : `${keywords} - Slashy.shop`} />
        <meta
          property="og:description"
          content={keyword ? `Search ${keyword} - Best prices - Slashy.shop` : `${keywords} - Best prices - Slashy.shop`}
        />
        <meta
          property="og:image"
          content={mainLogo}></meta>
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="900" />
        <meta property="og:url" content={window && window.location.href} />
        <title>{keyword ? `${keyword} for sale` : keywords} - Slashy</title>
    </Helmet>  
          <div className="flex gap-y-2 gap-x-1 flex-wrap xxs:justify-center lg:justify-between">
           {products.content[0].productList.map((p, i) => {
            if (p.sellPrice) {
              if (p.sellPrice.includes('--')) {
                  const sellPriceRange = p.sellPrice.split('--');
                  const newSellPriceMin = Number(sellPriceRange[0]) * 1.31;
                  const newSellPriceMax = Number(sellPriceRange[1]) * 1.31;
                  p.sellPrice = newSellPriceMin.toFixed(2) + '--' + newSellPriceMax.toFixed(2);
              } else {
                p.sellPrice = (Number(p.sellPrice) * 1.31).toFixed(2);
              }
          }
          return <Fragment key={i}>
              <SearchProduct p={p}></SearchProduct>
            </Fragment>})}
          </div>
          <Pagination page={page} total={products.totalPages}></Pagination>
          </Fragment>
      } else if (productListLength === 0) {
        return <div className="flex items-center min-h-[50vh] justify-center"><h1>No Products Found.</h1></div>
      }
    }, [isLoading])

    return <main className="relative lg:justify-between xxs:justify-evenly lg:ml-12 gap-y-4 flex-grow flex flex-wrap">          
      {render}  
    </main>
}