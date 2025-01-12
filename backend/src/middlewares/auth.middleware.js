import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";

import jwt from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
  try {
    //check for token from cookies
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // if no token found
    if (!token) {
      return next(new ApiError(401, "Unauthorized"));
    }
    // verify token
    const decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decodedToken._id).select(
      "-password -token"
    );
    if (!user) {
      return next(new ApiError(401, "Invalid Access Token"));
    }
    // attach user to request
    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(401, error.message || "Unauthorized"));
  }
};

export { verifyJWT };
