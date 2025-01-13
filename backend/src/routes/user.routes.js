import express from "express";

import {
  register,
  login,
  logout,
  getUserProfile,
  updateUserProfilePic,
  forgetPassword,
  updateUserUsername,
  updateUserPhonenumber,
  updateUserPassword,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// register route
router.post("/register", register);
// login route
router.post("/login", login);
// logout route
router.get("/logout", verifyJWT, logout);
// get user profile route
router.get("/", verifyJWT, getUserProfile);

// ---------- update user profile routes---------------------
// update user profilePic route
router.put("/updateUserProfilePic", updateUserProfilePic);
// update user username route
router.put("/updateUserUsername", verifyJWT, updateUserUsername);
// update user phone number route
router.put("/updateUserPhonenumber", verifyJWT, updateUserPhonenumber);
// update user password route
router.put("/updateUserPassword", verifyJWT, updateUserPassword);

// forget password route---------
router.post("/forgetPassword", forgetPassword);
export default router;
