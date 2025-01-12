import express from "express";
import {
  createPost,
  deletePost,
  updatePost,
  getAllPost,
} from "../controllers/post.controller.js";

const router = express.Router();

// create post route
router.post("/createPost", createPost);
// delete post route
router.delete("/deletePost", deletePost);
// update post route
router.put("/updatePost", updatePost);
// get post route
router.get("/getAllPost", getAllPost);

export default router;
