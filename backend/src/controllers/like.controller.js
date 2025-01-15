// like post controller
const likeOrUnlikePost = async (req, res, next) => {
  try {
    const userWhoLikesAnotherPost = req.user;
    const { whichPostToLike } = req.params;

    // check is user authenticated
    if (!userLikesAnotherPost) {
      return next(new ApiError(401, "Unauthorized"));
    }
    //get post
    const post = await Post.findById(whichPostToLike);
    if (!post) {
      return next(new ApiError(404, "Post not found"));
    }

    // like or unlike logic
    if (post.likes.includes(userWhoLikesAnotherPost)) {
      post.likes.pull(userWhoLikesAnotherPost);
      await post.save({ validateBeforeSave: false });
    } else {
      post.likes.push(userWhoLikesAnotherPost);
      await post.save({ validateBeforeSave: false });
    }

    // send response
    res
      .status(200)
      .json(new ApiResponse(200, post, "Post liked or unliked successfully"));
  } catch (error) {
    return next(new ApiError(500, error.message || "Internal Server Error"));
  }
};

export { likeOrUnlikePost };
