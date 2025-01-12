import express from "express";

import {
  register,
  login,
  logout,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// register route
router.post("/register", register);
// login route
router.post("/login", login);
// logout route
router.get("/logout", logout);
// get user profile route
router.get("/getUserProfile", verifyJWT, getUserProfile);
// update user profile route
router.put("/updateUserProfile", updateUserProfile);

export default router;
