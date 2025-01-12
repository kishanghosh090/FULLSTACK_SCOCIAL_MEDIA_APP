import express from "express";

import {
  register,
  login,
  logout,
  getUserProfile,
  getUserPosts,
  updateUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

// register route
router.post("/register", register);
// login route
router.post("/login", login);
// logout route
router.get("/logout", logout);
// get user profile route
router.get("/getUserProfile", getUserProfile);
// get user posts route
router.get("/getUserPosts", getUserPosts);
// update user profile route
router.put("/updateUserProfile", updateUserProfile);

export default router;
