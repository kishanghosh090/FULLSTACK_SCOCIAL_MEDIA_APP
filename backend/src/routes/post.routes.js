import express from "express";
import {
  createPost,
  deletePost,
  updatePost,
  getAllPost,
} from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// create post route
router.post("/createPost", verifyJWT, createPost);
// delete post route
router.delete("/deletePost", verifyJWT, deletePost);
// update post route
router.put("/updatePost", verifyJWT, updatePost);
// get post route
router.get("/getAllPost", getAllPost);

export default router;
