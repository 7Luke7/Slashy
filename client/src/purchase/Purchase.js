import { Fragment, useEffect, useState } from "react"
import "./purchase.css"  
import identify from "../public/identify.svg"
import mobile from "../public/mobile.svg"
import envelope from "../public/envelope.svg"
import { BringService } from "./BringService"
import { BringServiceLoading } from "./BringServiceLoading"
import { Link, useNavigate } from "react-router-dom"
import { CountyPopUp } from "./CountryPopUp"
import countries from "./countries.json"
import { MainLoading } from "./MainLoading"
import { PurchaseHeader } from "./PurchaseHeader"
import { OrderSummary } from "./OrderSummary"
import {Header} from "../Components/Header"
import {Footer} from "../Components/Footer"
import exclamationTriangle from "../public/exclamation-triangle.svg"

const Purchase = () => {
    const [variant, setVariant] = useState({})
    const [inventory, setInventory] = useState({})
    const [loading, setLoading] = useState(false)
    const [selectedLogistic, setSelectedLogistic] = useState({})
    const [city, setCity] = useState("")
    const [province, setProvince] = useState("")
    const [houseNumber, setHouseNumber] = useState("")
    const [fullName, setFullName] = useState("")
    const [zip, setZip] = useState("")
    const [country, setCountry] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [selectedCountry, setSelectedCountry] = useState()
    const [closeModal, setCloseModal] = useState(true)
    const [areas, setAreas] = useState([])
    const [warehouseCountryCode, setWarehouseCountryCode] = useState()
    const [deliveryLoading, setDeliveryLoading] = useState()
    const [streetAddress, setStreetAddress] = useState("")

    const [logisticError, setLogisticError] = useState()
    const [productFetchError, setProductFetchError] = useState()
    const [sessionExpiredError, setSessionExpiredError] = useState()
    const [fetchInventoryError, setFetchInventoryError] = useState()
    const [warning, setWarning] = useState("")
    const [rateLimitError, setRateLimitError] = useState()

    const navigate = useNavigate()

    useEffect(() => {
      if (Object.keys(variant).length !== 0) {
        get_area_inventory_info()
      }
    }, [variant])

    useEffect(() => {
      window.scrollTo(0, 0)
      const has_country_selected = localStorage.getItem("countryCode")

      if (!has_country_selected) {
        return setCloseModal(false)
      } else {
        setCloseModal(true)
        const country = countries.find(c => c.code === has_country_selected)
        setCountry(country.name)
        setSelectedCountry(country.code)
      }
    }, [closeModal])
    
    useEffect(() => {
      document.title = "Slashy - Purchase"
      const purchase_targets = JSON.parse(sessionStorage.getItem("purchases"))

      if (!purchase_targets) {
        return setSessionExpiredError("Purchase Session has expired.")
      } 

      setLoading(true)
      const get_all_variants = async () => {
        try {
          const request_all_variants = await fetch("https://m.cjdropshipping.com/elastic-api/cjProductInfo/v2/getProductDetail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "omit",
            body: JSON.stringify({
                id: purchase_targets.pid
            })
          })

          const data = await request_all_variants.json()

          const target_variant = data.data.stanProducts.find((a) => a.ID === purchase_targets.vid)
  
          if (!target_variant.NAMEEN) {
            target_variant["NAMEEN"] = data.data.NAMEEN
          }
  
          target_variant.SELLPRICE = ((Number(target_variant.SELLPRICE) * 1.31) * purchase_targets.quantity).toFixed(2);
          target_variant.quantity = purchase_targets.quantity
          target_variant.property = data.data.PROPERTYKEY
          target_variant.psku = data.data.SKU
          target_variant.pid = data.data.ID
          target_variant.supplierId = data.data.supplier_id
          target_variant.PRODUCTTYPE = data.data.PRODUCTTYPE

          setVariant(target_variant)
          setLoading(false)
        } catch (error) {
          setProductFetchError(error.message)
        }
      }

      get_all_variants()
    }, [])

    const make_order = async (e) => {
      e.preventDefault()
      const regex = /^[0-9]+$/;
      const regex2 = /^[0-9\s+-]{6,32}$/;

      if (regex.test(streetAddress)) {
        return setWarning("The address cannot consist of numbers only.")
      }

      if (!regex2.test(phoneNumber)) {
        return setWarning("Phone number Must be a 6-32 digit number (only numbers, symbols and spaces are supported).")
      }

      setWarning("")
      const from_country_code = warehouseCountryCode || areas[0].countryCode  

      const payload = {
        shippingZip: zip,
        shippingCountryCode: selectedCountry,
        shippingCountry: country,
        shippingProvince: province,
        shippingCity: city,
        shippingAddress: streetAddress,
        shippingCustomerName: fullName,
        shippingPhone: phoneNumber,
        fromCountryCode: from_country_code,
        logisticName: selectedLogistic.logisticName,
        houseNumber: houseNumber,
        email: email,
        products: [
          {
              vid: variant.ID,
              quantity: variant.quantity
          }
      ]
      }

      try {
        const make_order_request = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/make_cj_order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(payload)
        })

        if (!make_order_request.ok) {
          const errorMessage = await make_order_request.text();
          throw new Error(errorMessage);
        }
  
        const order_response = await make_order_request.json()

        navigate(`/purchase/${order_response.data}`)
      } catch (error) {
        if (error.message === 'Your request limit has been reached. try again after 5 seconds.') {
          setRateLimitError(true)
          const timeout_id = setTimeout(() => {
            setRateLimitError(false)
          }, 5000)
  
          clearTimeout(timeout_id)
        } else {
          alert(error.message)
        }
      }
    }

    const get_area_inventory_info = async () => {
      try {
        const request_area_info = await fetch("https://cjdropshipping.com/elastic-api/product/inventory/getAreaInventoryInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: variant.PID 
        })
      })

      if (!request_area_info.ok) {
        throw new Error("Product location request failed please try again.")
      }

      const area_info = await request_area_info.json()

      setAreas(area_info.data)   
      } catch (error) {
        setFetchInventoryError(error.message)
      }
  }

  useEffect(() => {
    const get_logistic = async () => {
      if (!Object.keys(variant).length) {
        return
      }
      setDeliveryLoading(true)
      setLogisticError(null)
      try {
        const standards_with_equal = variant.STANDARD.match(/\d+/g);
        const length = standards_with_equal[0]
        const width = standards_with_equal[1]
        const height = standards_with_equal[2]

        const volumeWeight = variant.quantity * ((length / 10) * (width / 10) * (height / 10))
        const weight = variant.quantity * variant.PACKWEIGHT
        const start_country = warehouseCountryCode || areas[0].countryCode  

        if (variant.PRODUCTTYPE === "5") {
          const request_discounted_logistics = await fetch("https://cjdropshipping.com/cujiaLogisticsFreight/freight/logistics/getLogisticsDiscountPrice/v2", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(
            {
              "area": start_country,
              "country": selectedCountry,
              "character": variant.property,
              "weight": weight,
              "sku": variant.psku,
              "pid": variant.pid,
              "supplierId": variant.supplierId,
              "productType": variant.PRODUCTTYPE
            }
          )

        })

        const logistics = await request_discounted_logistics.json()  

        if (!logistics.data || logistics.data.length === 0) {
          throw new Error(`Product can't be shipped from ${start_country} to ${selectedCountry}.`)
        }

        const logistics_modified = logistics.data.map((l) => {
          if (Number(l.price) === 0) {
            l.price = 2
          } else {
            l.price = (Number(l.price) * 1.19).toFixed(2);
          }
        })

        setInventory(logistics_modified)
        setSelectedLogistic(logistics.data[0])
        return setDeliveryLoading(false)
        }

        const request_logistics = await fetch("https://cjdropshipping.com/cujiaLogisticsFreight/freight/logistics/getUnionLogisticsFreight/v2", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(
            [{
              "startCountryCode": start_country,
              "countryCode": selectedCountry,
              "property": variant.property,
              "weight": weight,
              "sku": variant.psku,
              "length": length,
              "width": width,
              "height": height,
              "volume": volumeWeight,
              "skus": [variant.SKU],
              "supplierId": variant.supplierId,
              "pid": variant.pid
            }]
          )

        })
        
        const logistics = await request_logistics.json()  

        if (!logistics.data || logistics.data.length === 0) {
          throw new Error(`Product can't be shipped from ${start_country} to ${selectedCountry}.`)
        }
        
        const logistics_modified = logistics.data.map((l) => {
          if (Number(l.price) === 0) {
            l.price = 2
          } else {
            l.price = (Number(l.price) * 1.19).toFixed(2);
          }
          return l
        })
        
        setInventory(logistics_modified)
        setSelectedLogistic(logistics.data[0])
        setDeliveryLoading(false)
      } catch (error) {
        setLogisticError(error.message)
      }
  }

    get_logistic()
  }, [areas, warehouseCountryCode, closeModal])

    const changeLogistic = (f) => {
      setSelectedLogistic("")
      setSelectedLogistic(f)
    }

    const full_price = selectedLogistic.price && Object.keys(variant).length && (Number(selectedLogistic.price) + Number(variant.SELLPRICE)).toFixed(2)

    return <Fragment>
      {
        sessionExpiredError ? <Fragment>
          <Header></Header>
            <div className="flex h-[75vh] items-center justify-center flex-col">
              <h1>Purchase session expired.</h1>
              <Link to="/" className="mt-4 px-4 bg-[#fd5702] rounded text-white py-2">
                Home Page
              </Link>
            </div>
          <Footer></Footer>
        </Fragment> : !closeModal ? <CountyPopUp setCloseModal={setCloseModal} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}></CountyPopUp> : loading ? <MainLoading></MainLoading> : !loading && closeModal && <Fragment>
        <PurchaseHeader></PurchaseHeader>
      <form onSubmit={make_order} className="grid sm:px-10 xl:grid-cols-2 xl:px-20 xl:px-32">
        <OrderSummary setWarehouseCountryCode={setWarehouseCountryCode} deliveryLoading={deliveryLoading} closeModal={closeModal} setCloseModal={setCloseModal} productFetchError={productFetchError} fetchInventoryError={fetchInventoryError} warehouseCountryCode={warehouseCountryCode} variant={variant} inventory={inventory} changeLogistic={changeLogistic} selectedLogistic={selectedLogistic} logisticError={logisticError} areas={areas} BringServiceLoading={BringServiceLoading} BringService={BringService}></OrderSummary>
        <div className="bg-gray-50 justify-between flex flex-col pt-8 xxs:mt-5 px-4 xl:mt-0">
          <div>
            <p htmlFor="fullname" className="mt-4 mb-2 block text-sm font-medium">Full name</p>
            <div className="relative">
              <input value={fullName} required onChange={(e) => setFullName(e.target.value)} type="text" name="fullname" placeholder="Full name" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-[rgb(243,104,29)] focus:ring-[rgb(243,104,29)]" />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <img loading="lazy" src={identify} alt="identify"></img>
              </div>
            </div>
            <p htmlFor="phone" className="mt-4 mb-2 block text-sm font-medium">Mobile number</p>
            <div className="relative">
              <input value={phoneNumber} required onChange={(e) => setPhoneNumber(e.target.value)} type="number" name="phone" placeholder="Phone number" className={`w-full rounded-md border ${warning === "Phone number Must be a 6-32 digit number (only numbers, symbols and spaces are supported)." ? "border-red-600" : "border-gray-200"} px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-[rgb(243,104,29)] focus:ring-[rgb(243,104,29)]`} />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <img loading="lazy" src={mobile} alt="tel"></img>
              </div>
            </div>
            <p htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">Email</p>
            <div className="relative">
              <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} name="email" required placeholder='Email' className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-[rgb(243,104,29)] focus:ring-[rgb(243,104,29)]" />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <img loading="lazy" src={envelope} alt="email"></img>                
              </div>
            </div>
            <div className='flex justify-between items-center'>
            <p className="mt-4 mb-2 block text-sm font-medium">Address</p>
            </div>
            <div className='flex flex-col w-full xxs:gap-1 sm:gap-0 items-center'>
                    <div className="flex xxs:flex-col sm:flex-row w-full items-center">
                    <input
                        id="country"
                        name="country"
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        type="text"
                        placeholder="Country"
                        required
                        className="w-full rounded-md border border-gray-200 px-3 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-[rgb(243,104,29)] focus:ring-[rgb(243,104,29)]" />
                        <input
                    id="province"
                    name="province"
                    onChange={(e) => {
                        setProvince(e.target.value)
                    }}
                    value={province}
                    type="text"
                    required
                    placeholder="Province"
                    className="w-full rounded-md border border-gray-200 px-3 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-[rgb(243,104,29)] focus:ring-[rgb(243,104,29)]" />   
                    </div> 

                    <div className="w-full xxs:flex-col sm:flex-row flex items-center">
                    <input
                    id="city"
                    name="city"
                    onChange={(e) => {
                        setCity(e.target.value)
                    }}
                    value={city}
                    type="text"
                    required
                    placeholder="City"
                    className="w-full rounded-md border border-gray-200 px-3 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-[rgb(243,104,29)] focus:ring-[rgb(243,104,29)]" />    

                      <input
                        id="house"
                        name="house"
                        onChange={(e) => setHouseNumber(e.target.value)}
                        value={houseNumber}
                        type="number"
                        placeholder="House number"
                        className="w-full rounded-md border border-gray-200 px-3 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-[rgb(243,104,29)] focus:ring-[rgb(243,104,29)]" />
                      </div>
                    <div className="w-full xxs:flex-col sm:flex-row flex items-center">
                    <input
                        id="zip"
                        name="zip"
                        onChange={(e) => setZip(e.target.value)}
                        value={zip}
                        type="text"
                        placeholder="Zip code"
                        required
                        className={`w-full rounded-md border ${warning.includes("post code") ? "border-red-600" : "border-gray-200"} px-3 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-[rgb(243,104,29)] focus:ring-[rgb(243,104,29)]`} />
                      <input name="address" required onChange={(e) => setStreetAddress(e.target.value)} value={streetAddress} type="text" className={`w-full rounded-md border ${warning === "The address cannot consist of numbers only." ? "border-red-600" : "border-gray-200"} px-3 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-[rgb(243,104,29)] focus:ring-[rgb(243,104,29)]`} placeholder="Shipping address" />
                    </div>
                </div>
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Product</p>
                <p className="font-semibold text-gray-900">${variant.SELLPRICE}</p>
              </div>
              <div className="flex items-center border-b justify-between">
                <p className="text-sm font-medium text-gray-900">Delivery</p>
                <p className="font-semibold text-gray-900">${selectedLogistic.price && selectedLogistic.price}</p>
              </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Full price</p>
              <p className="text-2xl font-semibold text-[rgb(255,128,64)]">${full_price}</p>
            </div>
            </div>
          </div>
            {warning && <div className="flex bg-red-600 p-2 gap-x-2 items-center">
                  <img src={exclamationTriangle} alt="warning"></img>
                  <p className="text-sm">{warning}</p>
              </div>}
              {rateLimitError && <div className="flex bg-red-600 p-2 gap-x-2 items-center">
                  <img src={exclamationTriangle} alt="warning"></img>
                  <p className="text-sm">Your request limit has been reached. try again after 5 seconds.</p>
              </div>}
            <button type='submit' disabled={rateLimitError} className={`mb-4 w-full ${rateLimitError ? "bg-gray-600 hover:bg-gray-600" : "hover:bg-gray-800 bg-gray-900"} rounded-md px-6 py-3 font-medium text-white`}>Prcoeed to payment</button>
        </div>
      </form>
      <div className="mt-14">
      <Footer></Footer>
      </div>
        </Fragment>
      }
    </Fragment>
}

export default Purchase