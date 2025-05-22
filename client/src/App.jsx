import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import Update from "./components/Update";
import GetProduct from "./components/GetProduct";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/updateProduct/:id" element={<Update />} />
        <Route path="/getProduct" element={<GetProduct />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
