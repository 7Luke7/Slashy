import { Fragment, memo } from "react"

export const OrderSummary = memo(({setWarehouseCountryCode, deliveryLoading, closeModal, setCloseModal, productFetchError, fetchInventoryError, warehouseCountryCode, variant, inventory, changeLogistic, selectedLogistic, logisticError, areas, variant_sell_price, BringServiceLoading, BringService}) => {
    return <div className="px-4 flex flex-col pt-8">
      {productFetchError ? <h1 className="text-center pt-20 text-gray-900 text-md font-semibold">{!productFetchError.length ? "We had an error while fetching product. try later." : productFetchError}</h1> : <Fragment>
      <p className="text-xl font-medium">Order summary</p>
      <p className='text-gray-400'>Read the summary until purchasing.</p>
      {Object.keys(variant).length !== 0 && <div className="mt-3 relative rounded-lg border overflow-hidden bg-red-100">
      <span className="absolute top-0 right-0 bg-[rgb(243,104,29)] px-2 py-0.5 text-lg opacity-90 text-center text-white">{variant.quantity}pcs</span>
      <div className="flex flex-col rounded-lg h-full bg-white sm:flex-row">
      <img loading="lazy" className="rounded-md sm:h-full border sm:w-[144px] object-cover object-center" src={window.innerWidth >= 425 ? `${variant.IMG}?x-oss-process=image/format,webp,image/resize,m_fill,w_360,h_240` : `${variant.IMG}?x-oss-process=image/format,webp,image/resize,m_fill,w_240,h_144`} alt="ფოტო" />
      <div className="flex pt-2 w-full flex-col px-4">
          <h1 className="font-bold">{variant.NAMEEN && variant.NAMEEN.slice(0, 100) || "Without title"}...</h1>
            <Fragment>
              <p className="text-gray-500 text-md">{variant.VARIANTKEY}</p>
              <p id="price" className="text-lg text-[rgb(255,128,64)] font-bold">${Number(variant_sell_price).toFixed(2)}</p>
            </Fragment>
      </div>
      </div>
      </div>}
    </Fragment>}

  {fetchInventoryError ? <h1 className="text-center pt-20 text-gray-900 text-md font-semibold">{!logisticError.length ? "We had an error while fetching inventory. try later." : logisticError}</h1> : <div className="xxs:mb-5 lg:mb-0">
      <div className="flex mt-8 items-center justify-between">
        <p className="text-lg font-medium">Delivery service</p>
        {areas.length > 0 && <select className="border outline-none" onChange={(e) => setWarehouseCountryCode(e.target.value)}>
          {areas.map((a, i) => {
            return <option value={a.countryCode} key={i}>
              {a.areaEn}
            </option>
          })}
        </select>}
      </div>
    {logisticError ?<div className="flex space-y-2 flex-col items-center justify-center mt-5">
      <h1 className="text-center text-gray-900 text-md font-semibold">{logisticError}</h1>
      <button className="bg-[#fd5702] rounded text-white px-4 py-2" onClick={() => {
        localStorage.removeItem("countryCode")
        setCloseModal(false)
      }}>Change country</button>
    </div> : deliveryLoading ? <BringServiceLoading></BringServiceLoading> : inventory.length && <BringService changeLogistic={changeLogistic} inventory={inventory} selectedLogistic={selectedLogistic}></BringService>}
  </div>}

  </div>
})