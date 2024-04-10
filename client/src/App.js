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
import ProcessPurchase from "./purchase/ProcessPurchase";
import { TrackingInfo } from "./tracking/TrackingInfo";
import { Payment } from "./purchase/Payment";
import { HelmetProvider } from 'react-helmet-async';
import { Affiliate } from "./affiliate/Affiliate";
import Login from "./authenticate/Login";
import Register from "./authenticate/Register";
import { Dashboard } from "./dashboard/Dashboard";
import { Account } from "./dashboard/Account";
import { DashboardContent } from "./dashboard/DashboardContent";
import { AffiliateLinks } from "./dashboard/AffiliateLinks";
import { Withdraw } from "./withdraw/Withdraw";

const App = () => {
  return  <HelmetProvider>
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
    <Route path="affiliate" element={<Affiliate></Affiliate>}></Route>
    <Route path="signup" element={<Register></Register>}></Route>
    <Route path="signin" element={<Login></Login>}></Route>
    <Route path="withdraw" element={<Withdraw />} />
    <Route path="/dashboard" element={<Dashboard />}>
      <Route path="" element={<DashboardContent />} />
      <Route path="links" element={<AffiliateLinks />} />
      <Route path="account" element={<Account />} />
    </Route>
  </Routes>
</BrowserRouter>
  </HelmetProvider>
}

export default App;
