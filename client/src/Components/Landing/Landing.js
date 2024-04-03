import { Header } from "../Header"
import { Navigation } from "../Navigation"
import {TrendingProducts} from "../TrendingProducts"
import {Footer} from "../Footer"
import { Suspense, lazy } from "react"
import { Helmet } from "react-helmet-async"
import mainLogo from "../../public/slashy_logo.webp"

const VideoProducts = lazy(() => import("../VideoProducts"))
const HotCategories = lazy(() => import("../HotCategories"))
const NewProducts = lazy(() => import("../NewProducts"))
const BestDeals = lazy(() => import("../BestDeals"))

export const Landing = () => {
  return <>
    <Helmet>
    <meta
          name="description"
          content="Free delivery on many items. Get the best shopping experience. Benefit from the best prices and great deals on daily essential items and other products with the largest selection, including fashion, home, beauty, electronics, sports, toys, pets, kids, books, video games, office supplies, and more."
        />
        <meta
          name="keywords"
          content="Slashy, from China, from America, from Germany, from England, online shopping, online store, low price, best price, books, bookstore, magazine, subscription, music, CD, DVD, video, electronics, video games, computers, mobile phones, toys, games, clothing, accessories, footwear, cosmetics, watches, office products, sports & outdoor, sports goods, children's products, health, personal care, beauty, home, garden, kitchen & dining, pets, hardware, appliances, tools, outdoor equipment, automotive parts, pet supplies, interior decoration"
        />
        <link rel="canonical" href="https://slashy.shop" />
        <title>Slashy.shop. Online Store. Best Prices.</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Products from Abroad - Slashy" />
        <meta
          property="og:description"
          content="We offer to buy products prepared abroad at low prices - Slashy"
        />
        <meta
          property="og:image"
          content={mainLogo}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="900" />
        <meta property="og:url" content="https://slashy.shop" />
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
    </Helmet>
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
  </>
}