import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import LayoutDefault from "../config/layout/Default";
import Home from "../pages/home/Home";
import Tabela from "../pages/home/HomeSearch";
import { SignIn } from "../pages/SignIn/SignIn";
import { SignUp } from "../pages/SignIn/SignUp";

const AppRoutes: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search=:assunto/:status" element={<Tabela />} />
          <Route path="/search=/:status" element={<Tabela />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
