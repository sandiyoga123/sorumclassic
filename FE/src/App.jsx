import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { initFlowbite } from "flowbite";
import Navbar from "./templates/navbar";
import Dashboard from "./modules/dashboard";
import Login from "./modules/login";
import NavbarAdmin from "./templates/navbar-admin";
import Register from "./modules/register";
import Unit from "./modules/unit";
import DetailUnit from "./modules/unit/detail-unit";
import AddUnit from "./modules/unit/add";
import EditUnit from "./modules/unit/edit";
import Home from "./modules/home";
import Product from "./modules/product";
import DetailProduct from "./modules/product/detail";
import CheckoutProduct from "./modules/product/checkout";
import UserOrder from "./modules/user/order";
import "./sidebar.css";
import NavbarUser from "./templates/navbar-user";
import FAQ from "./modules/faq";
import OrderAdmin from "./modules/admin/order";
import OrderDetailAdmin from "./modules/admin/order/detail";

export default function App() {
  // Re-initialize Flowbite components after navigation

  return (
    <BrowserRouter>
      <Routes>
        {/* Global */}
        <Route path="/" element={<Navbar component={Home} />} />
        <Route path="/faq" element={<Navbar component={FAQ} />} />
        <Route path="/product" element={<Navbar component={Product} />} />
        <Route path="/product/:id" element={<Navbar component={DetailProduct} />} />
        <Route path="/checkout/:id" element={<NavbarUser component={CheckoutProduct} />} />

        <Route path="/order" element={<NavbarUser component={UserOrder} />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin/" element={<NavbarAdmin component={Dashboard} />} />
        <Route path="/admin/order" element={<NavbarAdmin component={OrderAdmin} />} />
        <Route path="/admin/order/:order_id" element={<NavbarAdmin component={OrderDetailAdmin} />} />

        <Route path="/admin/unit" element={<NavbarAdmin component={Unit} />} />
        <Route path="/admin/unit/new" element={<NavbarAdmin component={AddUnit} />} />
        <Route path="/admin/unit/edit/:id" element={<NavbarAdmin component={EditUnit} />} />
        <Route path="/admin/unit/:id" element={<NavbarAdmin component={DetailUnit} />} />
      </Routes>
    </BrowserRouter>
  );
}
