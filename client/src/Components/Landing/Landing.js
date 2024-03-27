import { Header } from "../Header"
import { Navigation } from "../Navigation"
import {TrendingProducts} from "../TrendingProducts"
import {Footer} from "../Footer"
import { Fragment, Suspense, lazy, useEffect } from "react"

const VideoProducts = lazy(() => import("../VideoProducts"))
const HotCategories = lazy(() => import("../HotCategories"))
const NewProducts = lazy(() => import("../NewProducts"))
const BestDeals = lazy(() => import("../BestDeals"))

export const Landing = () => {
  useEffect(() => {
    document.title = "Slashy.store. Online store. Less Prices."
    const slick_src = [
      "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
    ]

    for (let i = 0; i < slick_src.length; i++) {
      const link = document.createElement("link")

      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = slick_src[i]

      document.head.appendChild(link)
    }
  }, [])

  return <Fragment>
      <Header></Header>
      <section id="closeScroll" className="sm:w-[83%] lg:w-[77%] xxs:w-full m-auto">
        <Navigation></Navigation>
        <main className="sm:w-full xs:w-[90%] xxs:w-[80%] m-auto">
          <TrendingProducts />
            <Suspense fallback={<div>Loading...</div>}>
              <NewProducts></NewProducts>
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <VideoProducts></VideoProducts>
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <BestDeals></BestDeals>
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <HotCategories></HotCategories>
            </Suspense>
        </main>
      </section>
      <section className="mt-20">
        <Footer />
      </section>
  </Fragment>
}