import express from "express";
import {
  createPost,
  deletePost,
  updatePost,
  getAllPost,
} from "../controllers/post.controller.js";
import { likeOrUnlikePost } from "../controllers/like.controller.js";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../controllers/comment.controller.js";

// auth middleware
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// create post route
router.post("/createPost", verifyJWT, upload.single("image"), createPost);
// delete post route
router.delete("/deletePost/:id", verifyJWT, deletePost);
// update post route
router.put("/updatePost", verifyJWT, upload.single("image"), updatePost);
// get post route
router.get("/getAllPost", getAllPost);

// -------------like post route----------------
router.put("/likeOrUnlikePost", verifyJWT, likeOrUnlikePost);
// comment post route
router.post("/commentPost/:whichPost", verifyJWT, createComment);
// update comment route
router.put("/updateComment", verifyJWT, updateComment);
// delete comment route
router.delete("/deleteComment", verifyJWT, deleteComment);

// export router
export default router;
