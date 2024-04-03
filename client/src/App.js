import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Landing } from "./Components/Landing/Landing";
import NotFound from "./NotFound";
import Cart from "./cart/Cart";
import ViewMore from "./view-more/ViewMore"
import Boards from "./boards/Boards"
import Search from "./search/Search";
import Product from "./product/Product";
import Purchase from "./purchase/Purchase"
import Category from "./category/Category"
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ProcessPurchase from "./purchase/ProcessPurchase";
import { TrackingInfo } from "./tracking/TrackingInfo";
import { Payment } from "./purchase/Payment";
import { HelmetProvider } from 'react-helmet-async';

const initialOptions = {
  clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
};

const App = () => {
  return  <HelmetProvider>
    <PayPalScriptProvider options={initialOptions}>
    <BrowserRouter>
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="cart" element={<Cart />} />
    <Route path="view-more/:id" element={<ViewMore />} />
    <Route path="boards/:id" element={<Boards />} />
    <Route path="search" element={<Search />} />
    <Route path="*" element={<NotFound />} />
    <Route path="product/:id" element={<Product />} />
    <Route path="category" element={<Category />} />
    <Route path="purchase" element={<Purchase />} />
    <Route path="purchase/:id" element={<ProcessPurchase />} />
    <Route path="tracking" element={<TrackingInfo />} />
    <Route path="payment/:id" element={<Payment></Payment>}></Route>
  </Routes>
</BrowserRouter>
  </PayPalScriptProvider>
  </HelmetProvider>
}

export default App;
