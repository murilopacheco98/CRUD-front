import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import LayoutDefault from "../config/layout/Default";
import Home from "../pages/home/Home";
import Tabela from "../pages/home/HomeSearch"

const AppRoutes: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
        {/* <Route path="/" element={<LayoutDefault component={Home} />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/search=:assunto/:status" element={<Tabela />} />
          <Route path="/search=/:status" element={<Tabela />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
