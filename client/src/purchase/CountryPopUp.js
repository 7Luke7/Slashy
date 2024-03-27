import countries from "./countries.json"
export const CountyPopUp = ({setCloseModal, selectedCountry, setSelectedCountry}) => {

    const submitCountry = (e) => {
        e.preventDefault()
        if (!selectedCountry || selectedCountry === "Select country") {
            return
        } else {
            localStorage.setItem("countryCode", selectedCountry)
            return setCloseModal(true)
        }
    }

    return <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="fixed inset-0 bg-gray-900 bg-opacity-20 transition-opacity"></div>
  
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div className="flex min-h-[60%] items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Country</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">We must know your country to send the package precisely, Please choose your country. We will save it for later usage.</p>
                </div>
              </div>
            </div>
          </div>
          <form className="bg-gray-50 py-3 sm:flex sm:px-6">
            <select onChange={(e) => setSelectedCountry(e.target.value)} className="outline-none py-2 w-full px-2 border rounded"> 
                {countries.map((c, i) => {
                    return <option key={i} value={c.code}>{c.name}</option>
                })}
            </select>
            <button type="submit" onClick={submitCountry} className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm bg-[rgb(251,77,1)] sm:mt-0 sm:w-auto">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
}