import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { initFlowbite } from "flowbite";
import Navbar from "./templates/navbar";
import Dashboard from "./modules/dashboard";
import Login from "./modules/login";
import NavbarAdmin from "./templates/navbar-admin";
import Register from "./modules/register";
import Unit from "./modules/unit";
import DetailUnit from "./modules/unit/detail-unit";

export default function App() {
  initFlowbite();
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Global */}
          <Route path="/" element={<Navbar component={Dashboard} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin/" element={<NavbarAdmin component={Dashboard} />} />
          <Route path="/admin/unit" element={<NavbarAdmin component={Unit} />} />
          <Route path="/admin/unit/:id" element={<NavbarAdmin component={DetailUnit} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
