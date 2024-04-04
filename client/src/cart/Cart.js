import { Fragment, useEffect, useState } from "react"
import { Header } from "../Components/Header"
import { Footer } from "../Components/Footer"
import sadIcon from "../public/sad-icon.svg"
import { CartItem } from "./CartItem"

const Cart = () => {
    const [cartArray, setCartArray] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)

    useEffect(() => {
        document.title = "Slashy - cart"
        document.getElementById("notification").style.display = "none"
        const items = JSON.parse(localStorage.getItem("cart"))
        if (!items || !items.length) return setIsEmpty(true)
        setCartArray(items)
    }, [])

    const cartItemDelete = (id, i) => {
        const cartItems = JSON.parse(localStorage.getItem("cart"));
        const deletedItemArray = cartItems.filter((items, index) => index !== i);
        localStorage.setItem("cart", JSON.stringify(deletedItemArray))
        localStorage.setItem("cart", JSON.stringify(deletedItemArray))
        setCartArray(deletedItemArray)

        if (deletedItemArray.length === 0) {
            return setIsEmpty(true)
        }
    }

    const remove_cart_items = async () => {
        localStorage.clear()
        setCartArray([])
        setIsEmpty(true)
    }

        return <>
            <div className="relative">
        <Header></Header>
        <div id="closeScroll" className="min-h-[90vh]">
        {isEmpty ? <div className="flex mt-8 flex-col items-center gap-2 justify-center">
        <div className="flex gap-2 items-center">
            <p className="text-base">Cart is empty.</p>
            <img width={24} alt="sad emoji" height={24} src={sadIcon} loading="lazy"></img>
        </div>

        <a href="/" className="bg-[rgb(237,123,82)] text-sm font-sm rounded p-2 text-white">Continue shopping</a>

        </div> :
        <div className={`${cartArray && cartArray.length > 0 ? "grid-cols-4 xs:grid-cols-1 xxs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:grid-cols-3" : "grid-cols-1"}  gap-5 relative grid mb-3 mt-10 `}>        
        {cartArray.map((v, i) => {
            return (
              <Fragment key={i}>
                <CartItem v={v} i={i} cartItemDelete={cartItemDelete}></CartItem>
              </Fragment>
            );
          })}
          </div>}
        </div>
        {cartArray.length && <section className="sticky bg-slate-50 flex items-center justify-center px-5 h-[60px] bottom-0 right-0">
        <button className="rounded bg-[rgb(251,77,1)] hover:bg-[rgb(231,57,1)] w-28 justify-center rounded gap-3 font-normal text-white flex items-center text-[13px] p-2 space-3" onClick={remove_cart_items}>
        Clear cart
  </button>
    </section>}
        <Footer></Footer>
    </div>
        </> 
    }
export default Cart