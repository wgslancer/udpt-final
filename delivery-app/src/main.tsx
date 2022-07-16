import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Checkout from "./components/pages/Checkout";
import CurrentOrder from "./components/pages/CurrentOrder";
import ItemsContainer from "./components/pages/Hompage/ItemsContainer";
import AddItem from "./components/pages/Owner/AddItem";
import "./index.css";
import Homepage from "./pages/Homepage";
import Owner from "./pages/Owner";
import OwnerIndex from "./pages/Owner/OwnerIndex";
import Ship from "./pages/Ship/Ship";
import ShipIndex from "./pages/Ship/ShipIndex";
import Shipper from "./pages/Ship/Shipper";
import AuthProvider from "./provider/AuthProvider/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <AuthProvider protectRole={["client", "owner", "shipper"]}>
            <Homepage />
          </AuthProvider>
        }
      >
        <Route index element={<ItemsContainer />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/current-order" element={<CurrentOrder />} />
      </Route>
      <Route
        path="ship"
        element={
          <AuthProvider protectRole={["shipper"]}>
            <Ship />
          </AuthProvider>
        }
      >
        <Route index element={<ShipIndex />} />
        <Route path=":shipperId" element={<Shipper />} />
      </Route>
      <Route
        path="owner"
        element={
          <AuthProvider protectRole={["owner"]}>
            <Owner />
          </AuthProvider>
        }
      >
        <Route path="" element={<OwnerIndex />} />
        <Route path="add-item" element={<AddItem />} />
      </Route>
      <Route path="role-invalid" element={<div>Invalid role</div>}></Route>
    </Routes>
  </BrowserRouter>
);
