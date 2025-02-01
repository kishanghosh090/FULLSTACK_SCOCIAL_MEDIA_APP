import { Comment } from "../models/comment.models.js";
import { Post } from "../models/post.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// comment controller
const createComment = async (req, res, next) => {
  try {
    const { whichPost } = req.params;
    const { commentText } = req.body;
    const userId = req.user;

    // check is user authenticated
    if (!userId) {
      return next(new ApiError(401, "Unauthorized"));
    }
    if (!commentText) {
      return next(new ApiError(400, "Comment  is required"));
    }
    if (!whichPost) {
      return next(new ApiError(400, "Post Id is required"));
    }
    // create comment
    const comment = await Comment.create({
      text: commentText,
      user: userId,
      whichPost,
    });
    if (!comment) {
      next(new ApiError(500, "Comment creation failed"));
    }

    // get post
    const post = await Post.findById(whichPost);
    if (!post) {
      return next(new ApiError(404, "Post not found"));
    }
    // add comment to post
    post.comments.push(comment._id);
    await post.save({ validateBeforeSave: false });
    // send response
    res
      .status(200)
      .json(new ApiResponse(200, comment, "Comment created successfully"));
  } catch (error) {
    next(new ApiError(500, error.message || "Internal Server Error"));
  }
};

// delete comment controller
const deleteComment = async (req, res) => {};

// update comment controller
const updateComment = async (req, res) => {};

export { createComment, deleteComment, updateComment };
