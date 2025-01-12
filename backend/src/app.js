import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares

// cors----------------------------------------------------------------
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

// body parser to get json data from frontend--------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser to get cookies----------------------------------------
app.use(cookieParser());

export { app };
