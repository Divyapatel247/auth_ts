import express from "express";
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


  
  app.listen(8800, () => {
    console.log("Connected to Server");
  });