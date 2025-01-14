import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import Home from "./components/Home/Home.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <BrowserRouter>
      <Routes>
        {/* login and register routes */}
        <Route path="/">
          <Route path="Register" element={<Register />} />
          <Route path="Login" element={<Login />} />
        </Route>
        <Route path="/">
          <Route path="Home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
