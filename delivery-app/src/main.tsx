import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Checkout from "./components/pages/Checkout";
import ItemsContainer from "./components/pages/Hompage/ItemsContainer";
import "./index.css";
import Homepage from "./pages/Homepage";
import Ship from "./pages/Ship/Ship";
import Shipper from "./pages/Ship/Shipper";
import AuthProvider from "./provider/AuthProvider/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <AuthProvider>
            <Homepage />
          </AuthProvider>
        }
      >
        <Route index element={<ItemsContainer />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
      <Route path="ship" element={<Ship />}>
        <Route index element={<div>Ship index</div>} />
        <Route path=":shipperId" element={<Shipper />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
