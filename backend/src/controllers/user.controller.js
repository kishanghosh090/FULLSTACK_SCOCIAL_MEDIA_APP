import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// generate token
const generateToken = async (userId, next) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }
    // generate token
    const token = user.generateToken();
    return token;
  } catch (error) {
    return next(new ApiError(500, error.message || "Something went wrong"));
  }
};

//register controller
const register = async (req, res, next) => {
  try {
    // get user input from body
    const { username, email, password, phonenumber } = req.body;

    // check for empty fields
    if ([username, email, password, phonenumber].some((item) => !item)) {
      return next(new ApiError(400, "All fields are required"));
    }
    // check for invalid phone number
    if (phonenumber.length !== 10 || isNaN(phonenumber)) {
      return next(new ApiError(400, "Phone number is invalid"));
    }
    // check for invalid email
    if (!email.includes("@")) {
      return next(new ApiError(400, "Email is invalid"));
    }

    // create user
    const user = await User.create({
      username,
      email,
      password,
      phonenumber,
    });

    if (!user) {
      return next(new ApiError(500, "Something went wrong failed to register"));
    }

    // send response
    res
      .status(201)
      .json(new ApiResponse(201, "User registered successfully", user));
  } catch (error) {
    next(new ApiError(500, error.message || "Internal Server Error"));
  }
};

//login controller
const login = async (req, res, next) => {
  try {
    // get user input from body
    const { email, phonenumber, password } = req.body;

    // check for empty fields
    if (!email && !phonenumber) {
      return next(new ApiError(400, "Email or phone number is required"));
    }

    // check for invalid phone number
    if ((phonenumber && phonenumber.length !== 10) || isNaN(phonenumber)) {
      return next(new ApiError(400, "Phone number is invalid"));
    }

    // check for invalid email
    if (email) {
      if (!email.includes("@")) {
        return next(new ApiError(400, "Email is invalid"));
      }
    }

    // is password correct

    // check for user
    const user = await User.findOne({
      $or: [{ email }, { phonenumber }],
    });

    // if user not found
    if (!user) {
      next(new ApiError(404, "User not found"));
    }

    // check for password
    try {
      const isPasswordCorrect = await user.isPasswordCorrect(password);
      if (!isPasswordCorrect) {
        return next(new ApiError(400, "Password is incorrect"));
      }
    } catch (error) {
      next(new ApiError(500, error.message || "Internal Server Error"));
    }

    // generate token
    const token = user.generateToken(user._id, next);

    // attach token to user
    user.token = token;

    // save user
    await user.save();

    // cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };

    //send response
    res
      .status(200)
      .cookie("token", token, cookieOptions)
      .json(new ApiResponse(200, "User logged in successfully", user));
  } catch (error) {
    next(new ApiError(500, error.message || "Internal Server Error"));
  }
};

//logout controller
const logout = async (req, res, next) => {
  try {
    const userId = req.user;

    // check is user authenticated
    if (!userId) {
      return next(new ApiError(401, "Unauthorized"));
    }

    // get user
    const user = await User.findById(userId);

    // delete token from user
    user.token = null;
    await user.save();

    res
      .status(200)
      .clearCookie("token")
      .json(new ApiResponse(200, "User logged out successfully"));
  } catch (error) {
    return next(new ApiError(500, error.message || "Internal Server Error"));
  }
};

//get user profile controller
const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user;

    // check is user authenticated
    if (!userId) {
      return next(new ApiError(401, "Unauthorized"));
    }

    // get user
    const user = await User.findById(userId);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    // send response
    res
      .status(200)
      .json(new ApiResponse(200, "User profile fetched successfully", user));
  } catch (error) {
    return next(new ApiError(500, error.message || "Internal Server Error"));
  }
};

// update user profilePic controller
const updateUserProfilePic = async (req, res, next) => {
  try {
    const userId = req.user;

    // check is user authenticated
    if (!userId) {
      return next(new ApiError(401, "Unauthorized"));
    }

    const avatarLocalPath = req.file.path;
    if (!avatarLocalPath) {
      return next(new ApiError(400, "Avatar is required"));
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar) {
      return next(new ApiError(500, "Avatar upload failed"));
    }

    // get user
    const user = await User.findById(userId);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    // update user
    user.avatar = avatar?.url;
    await user.save({ validateBeforeSave: false });

    // send response
    res
      .status(200)
      .json(new ApiResponse(200, user, "User profilePic updated successfully"));
  } catch (error) {
    return next(new ApiError(500, error.message || "Internal Server Error"));
  }
};

//update user username controller
const updateUserUsername = async (req, res, next) => {
  try {
    const userId = req.user;

    // check is user authenticated
    if (!userId) {
      return next(new ApiError(401, "Unauthorized"));
    }

    const { username } = req.body;
    if (!username) {
      return next(new ApiError(400, "Username is required"));
    }

    // get user
    const user = await User.findById(userId);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    // update user
    user.username = username;
    await user.save({ validateBeforeSave: false });

    // send response
    res
      .status(200)
      .json(new ApiResponse(200, user, "User username updated successfully"));
  } catch (error) {
    return next(new ApiError(500, error.message || "Internal Server Error"));
  }
};

//update user phone number controller
const updateUserPhonenumber = async (req, res, next) => {
  try {
    const userId = req.user;

    // check is user authenticated
    if (!userId) {
      return next(new ApiError(401, "Unauthorized"));
    }
    const { phonenumber } = req.body;
    if (!phonenumber) {
      return next(new ApiError(400, "Phone number is required"));
    }
    // check for invalid phone number
    if (phonenumber.length !== 10 || isNaN(phonenumber)) {
      return next(new ApiError(400, "Phone number is invalid"));
    }

    // get user
    const user = await User.findById(userId);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    // update user
    user.phonenumber = phonenumber;
    await user.save({ validateBeforeSave: false });

    // send response
    res
      .status(200)
      .json(new ApiResponse(200, user, "User phone number updated"));
  } catch (error) {
    return next(new ApiError(500, error.message || "Internal Server Error"));
  }
};

//update user password controller
const updateUserPassword = async (req, res, next) => {
  try {
    const userId = req.user;

    // check is user authenticated
    if (!userId) {
      return next(new ApiError(401, "Unauthorized"));
    }

    const { oldpassword, newpassword } = req.body;
    if (!oldpassword || !newpassword) {
      return next(
        new ApiError(400, "Old password and new password are required")
      );
    }

    // get user
    const user = await User.findById(userId);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    // check password
    const isMatch = await user.isPasswordCorrect(oldpassword);
    if (!isMatch) {
      return next(new ApiError(400, "Old password is incorrect"));
    }

    // update user
    user.password = newpassword;
    await user.save({ validateBeforeSave: false });

    // send response
    res.status(200).json(new ApiResponse(200, user, "User password updated"));
  } catch (error) {
    return next(new ApiError(500, error.message || "Internal Server Error"));
  }
};

// forget password
const forgetPassword = async (req, res, next) => {};

export {
  register,
  login,
  logout,
  getUserProfile,
  updateUserProfilePic,
  updateUserUsername,
  updateUserPhonenumber,
  updateUserPassword,
  forgetPassword,
};
