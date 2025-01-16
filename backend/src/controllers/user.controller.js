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
    const { userName, email, password, phoneNumber } = req.body;

    // check for empty fields
    if ([userName, email, password, phoneNumber].some((item) => !item)) {
      return next(new ApiError(400, "All fields are required"));
    }
    // check for invalid phone number
    if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
      return next(new ApiError(400, "Phone number is invalid"));
    }
    // check for invalid email
    if (!email.includes("@")) {
      return next(new ApiError(400, "Email is invalid"));
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ApiError(400, "User already exists"));
    }

    // create user
    const user = await User.create({
      userName,
      email,
      password,
      phoneNumber,
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
    const { email, phoneNumber, password } = req.body;

    // check for empty fields
    if (!email && !phoneNumber) {
      return next(new ApiError(400, "Email or phone number is required"));
    }

    // check for invalid phone number
    if ((phoneNumber && phoneNumber.length !== 10) || isNaN(phoneNumber)) {
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
      $or: [{ email }, { phoneNumber }],
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
      .json(new ApiResponse(200, user, "User profile fetched successfully"));
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

//update user userName controller
const updateUserUserName = async (req, res, next) => {
  try {
    const userId = req.user;

    // check is user authenticated
    if (!userId) {
      return next(new ApiError(401, "Unauthorized"));
    }

    const { userName } = req.body;
    if (!userName) {
      return next(new ApiError(400, "userName is required"));
    }

    // get user
    const user = await User.findById(userId);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    // update user
    user.userName = userName;
    await user.save({ validateBeforeSave: false });

    // send response
    res
      .status(200)
      .json(new ApiResponse(200, user, "User userName updated successfully"));
  } catch (error) {
    return next(new ApiError(500, error.message || "Internal Server Error"));
  }
};

//update user phone number controller
const updateUserPhoneNumber = async (req, res, next) => {
  try {
    const userId = req.user;

    // check is user authenticated
    if (!userId) {
      return next(new ApiError(401, "Unauthorized"));
    }
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return next(new ApiError(400, "Phone number is required"));
    }
    // check for invalid phone number
    if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
      return next(new ApiError(400, "Phone number is invalid"));
    }

    // get user
    const user = await User.findById(userId);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    // update user
    user.phoneNumber = phoneNumber;
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
const forgetPassword = async (req, res, next) => {
  
};

export {
  register,
  login,
  logout,
  getUserProfile,
  updateUserProfilePic,
  updateUserUserName,
  updateUserPhoneNumber,
  updateUserPassword,
  forgetPassword,
};
