import { BrowserRouter, Routes, Route } from "react-router-dom";
//headr and footer components
import Header from "./components/Header";
import Footer from "./components/Footer";
// public pages
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import RegesterPage from "./pages/RegesterPage";
import UserProfile from "./pages/user/UserProfile";
import UserOrderDetails from "./pages/user/UserOrderDetails";
import UserOrdersPage from "./pages/user/UserOrdersPage";
import UserCart from "./pages/user/UserCart";
// admin pages
import AdminAnalysisPage from "./admin/AdminAnalysisPage";
import AdminChats from "./admin/AdminChats";
import AdminCreateProduct from "./admin/AdminCreateProduct";
import AdminEditProduct from "./admin/AdminEditProduct";
import AdminEditUserPage from "./admin/AdminEditUserPage";
import AdminOrderDetails from "./admin/AdminOrderDetails";
import AdminOrderPage from "./admin/AdminOrderPage";
import AdminProductPage from "./admin/AdminProductPage";
import AdminUsersPage from "./admin/AdminUsersPage";
import ProtectiveComPonent from "./components/ProtectiveComPonent";
import ProductDetails from "./pages/ProductDetails";
import ProductList from "./pages/ProductList";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* public pages */}

          <Route path="/" element={<HomePage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/RegesterPage" element={<RegesterPage />} />
          <Route element={<ProtectiveComPonent admin="false" />}>
            {/* user pages  */}
            <Route path="/User" element={<UserProfile />} />
            <Route path="/UserOrderDetails" element={<UserOrderDetails />} />
            <Route
              path="/UserOrderDetails/:id"
              element={<UserOrderDetails />}
            />
            <Route path="/UserOrder" element={<UserOrdersPage />} />
            <Route path="/UserCart" element={<UserCart />} />
            <Route path="/ProductDetails/:id" element={<ProductDetails />} />
            <Route path="/ProductList" element={<ProductList />} />
            <Route path="/ProductPage/:id" element={<ProductPage />} />
            <Route path="/CartPage" element={<CartPage />} />
          </Route>

          <Route element={<ProtectiveComPonent admin="true" />}>
            {/* admin pages */}
            <Route path="/AdminAnalys" element={<AdminAnalysisPage />} />
            <Route path="/AdminChats" element={<AdminChats />} />
            <Route
              path="/AdminCreateProduct"
              element={<AdminCreateProduct />}
            />
            <Route
              path="/AdminEditProduct/:id"
              element={<AdminEditProduct />}
            />
            <Route
              path="/AdminEditUserPage/:id"
              element={<AdminEditUserPage />}
            />
            <Route
              path="/AdminOrderDetails/:id"
              element={<AdminOrderDetails />}
            />
            <Route path="/AdminOrderPage" element={<AdminOrderPage />} />
            <Route path="/AdminProductPage" element={<AdminProductPage />} />
            <Route path="/AdminUsersPage" element={<AdminUsersPage />} />
          </Route>

          {/* 404 page  */}
          <Route path="*" element={<h1>404 Page Not Found</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
