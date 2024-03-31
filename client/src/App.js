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
import About from "./about/About";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ProcessPurchase from "./purchase/ProcessPurchase";

const initialOptions = {
  clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
};

const App = () => {
  return  <PayPalScriptProvider options={initialOptions}>
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
    <Route path="about" element={<About />} />
    <Route path="purchase/:id" element={<ProcessPurchase />} />
  </Routes>
</BrowserRouter>
  </PayPalScriptProvider>
}

export default App;
