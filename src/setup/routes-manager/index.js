import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes as Router, Route } from "react-router-dom";
import { AuthContext, CartContext } from "../context-manager/Context";

import Nav from "pages/Core/Nav";
import ProductDetail from "pages/Core/ProductDetail";
import Shop from "pages/Core/Shop";
import AdminRoutes from "../auth/AdminRoutes";
import EmployeeRoutes from "../auth/EmployeeRoutes";
import CustomerRoutes from "../auth/CustomerRoutes";
import CustomerBoard from "pages/Customer/CustomerBoard";
import EmployeeBoard from "pages/Employee/EmployeeBoard";
import AdminBoard from "pages/Admin/AdminBoard";
import Signup from "pages/Auth/Signup";
import Login from "pages/Auth/Login";

import Cart from "pages/Core/Cart";
import { CartPayment } from "pages/Core/CartPayment";
import ThankYou from "pages/Core/ThankYou";
import AdminDashPanel from "pages/Admin/AdminDashPanel";
import Footer from "pages/Core/Footer";
import { getUserCart } from "api/user";
import { isAuthenticated } from "../../api/auth";
import ForgotPassword from "pages/Auth/ForgotPassword";
import ResetPassword from "pages/Auth/ResetPassword";

const Routes = () => {
  const [authActive, setAuthActive] = useState(null);
  const [cart, setCart] = useState([]);

  const preLoadCart = async (userId, token) => {
    try {
      const data = await getUserCart(userId, token);
      return setCart(data.cart);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().user.role === 0) {
      preLoadCart(isAuthenticated().user._id, isAuthenticated().token);
    }
  }, []);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ authActive, setAuthActive }}>
        <CartContext.Provider value={{ cart, setCart, preLoadCart }}>
            <Nav />
            <Router>
              <Route path="/" element={<Shop />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="*" element={<p>There is nothing here 404!</p>} />
              <Route
                path="/customerboard/:currentTab/:userId"
                element={
                  <CustomerRoutes>
                    <CustomerBoard />
                  </CustomerRoutes>
                }
              />
              <Route
                path="/cart/payment/:userId"
                element={
                  <CustomerRoutes>
                    <CartPayment />
                  </CustomerRoutes>
                }
              />
              <Route
                path="/employeeboard/:currentTab/:userId"
                element={
                  <EmployeeRoutes>
                    <EmployeeBoard />
                  </EmployeeRoutes>
                }
              />
              <Route
                path="/adminboard/:currentTab/:userId"
                element={
                  <AdminRoutes>
                    <AdminBoard />
                  </AdminRoutes>
                }
              />
              <Route
                path="/admindashpanel/:currentTab/:userId"
                element={
                  <AdminRoutes>
                    <AdminDashPanel />
                  </AdminRoutes>
                }
              />
              <Route
                path="/cart/:userId"
                element={
                  <CustomerRoutes>
                    <Cart />
                  </CustomerRoutes>
                }
              />
              <Route
                path="/thankyou/:orderId"
                element={
                  <CustomerRoutes>
                    <ThankYou />
                  </CustomerRoutes>
                }
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route
                path="/resetpassword/:userId/:token"
                element={<ResetPassword />}
              />
            </Router>
            <Footer />
        </CartContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default Routes;
