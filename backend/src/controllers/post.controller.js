import { Post } from "../models/post.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// create post controller
const createPost = async (req, res, next) => {
  try {
    const userId = req.user;

    // check is user authenticated
    if (!userId) {
      return next(new ApiError(401, "Unauthorized"));
    }

    const { title, description } = req.body;

    const imageLocalPath = req?.file?.path;

    if (!title || !description || !imageLocalPath) {
      return next(new ApiError(400, "All fields are required"));
    }

    // get User
    const user = await User.findById(userId);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }
    const image = await uploadOnCloudinary(imageLocalPath);
    if (!image) {
      return next(new ApiError(500, "Image upload failed"));
    }

    // create post
    const post = await Post.create({
      title,
      description,
      image: image?.url,
      user: user._id,
    });
    user.posts.push(post._id);
    await user.save();
    // send response
    res
      .status(200)
      .json(new ApiResponse(200, post, "Post created successfully"));
  } catch (error) {
    return next(new ApiError(500, error.message || "Internal Server Error"));
  }
};

// delete post controller
const deletePost = async (req, res, next) => {
  try {
    const userId = req.user;
    const { id } = req.params;

    // check is user authenticated
    if (!userId) {
      return next(new ApiError(401, "Unauthorized"));
    }

    // get user
    const user = await User.findById(userId);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    // get post
    const post = await Post.findById(id);
    if (!post) {
      return next(new ApiError(404, "Post not found"));
    }

    // delete post
    await Post.findByIdAndDelete(id);
    user.posts.pull(id);
    await user.save({ validateBeforeSave: false });

    // send response
    res
      .status(200)
      .json(new ApiResponse(200, post, "Post deleted successfully"));
  } catch (error) {
    return next(new ApiError(500, error.message || "Internal Server Error"));
  }
};

// update post controller
const updatePost = async (req, res, next) => {
  try {
    const userId = req.user;

    // check is user authenticated
    if (!userId) {
      return next(new ApiError(401, "Unauthorized"));
    }
    const { title, description } = req.body;
    const { id } = req.params;

    // get post
    const post = await Post.findById(id);
    if (!post) {
      return next(new ApiError(404, "Post not found"));
    }

    // if update image
    const imageLocalPath = req?.file?.path;
    if (imageLocalPath) {
      const image = await uploadOnCloudinary(imageLocalPath);
      if (!image) {
        return next(new ApiError(500, "Image upload failed"));
      }
      post.image = image?.url;
    }

    // update post
    post.title = title;
    post.description = description;
    await post.save({ validateBeforeSave: false });

    // send response
    res
      .status(200)
      .json(new ApiResponse(200, post, "Post updated successfully"));
  } catch (error) {
    return next(new ApiError(500, error.message || "Internal Server Error"));
  }
};

// get post controller
const getAllPost = async (req, res, next) => {
  try {
    // get all posts
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user")
      .populate({
        path: "comments",
        populate: { path: "user" },
      });

    // send response
    res
      .status(200)
      .json(new ApiResponse(200, posts, "All posts fetched successfully"));
  } catch (error) {
    return next(new ApiError(400, error.message || "Internal Server Error"));
  }
};

export { createPost, deletePost, updatePost, getAllPost };
