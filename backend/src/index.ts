import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
// import userRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();


//middlewares
app.use(cors({ credentials: true,origin: ["http://localhost:3000"]}));
app.use(cookieParser())
app.use(express.json());
app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);

app.use((err:any, req:Request, res:Response, next:NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

  
  app.listen(8800, () => {
    console.log("Connected to Server");
  });