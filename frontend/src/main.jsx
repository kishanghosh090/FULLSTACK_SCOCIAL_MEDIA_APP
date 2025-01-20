import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import Home from "./components/Home/Home.jsx";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword.jsx";
import ViewPost from "./components/ViewPost/ViewPost.jsx";
import Settings from "./components/Settigs/Settings.jsx";
import EditProfile from "./components/Settigs/EditProfile.jsx";
import CreatePost from "./components/CreatePost/CreatePost.jsx";
import GetFriendProfile from "./components/Frient/GetFriendProfile.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <BrowserRouter>
      <Routes>
        {/* login and register routes */}
        <Route path="/">
          <Route path="Register" element={<Register />} />
          <Route path="Login" element={<Login />} />
          <Route path="ForgetPassword" element={<ForgetPassword />} />
        </Route>
        <Route path="/">
          <Route path="Home" element={<Home />} />
          <Route path="ViewChat" element={<Home />} />
          <Route path="Friends" element={<Home />} />
          <Route path="ViewPost" element={<ViewPost />} />
          <Route path="ViewPost/:id" element={<GetFriendProfile />} />
          <Route path="CreatePost" element={<CreatePost />} />
        </Route>
        <Route path="/Settings" element={<Settings />} />
        <Route path="/Settings/edit-profile" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
