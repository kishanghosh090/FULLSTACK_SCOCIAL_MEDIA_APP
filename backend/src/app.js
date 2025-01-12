import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// utils Api Handlers-------
import { ApiError } from "./utils/ApiError.js";
import { ApiResponse } from "./utils/ApiResponse.js";

const app = express();

// Middlewares

// cors-------------------------
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

// body parser to get json data from frontend----------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser to get cookies-------------
app.use(cookieParser());

// routes---------------------------------
import userRoute from "./routes/user.routes.js";
import postRoute from "./routes/post.routes.js";

app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);

// error handler middleware--------------------
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json(new ApiResponse(err.statusCode, err.message));
  }
});

// export app----
export { app };
