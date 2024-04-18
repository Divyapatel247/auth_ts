import { IRouter } from "express";
import express from "express"
import { signin, signup } from "../controllers/auth";

const router: IRouter = express.Router();


//CREATE USER
router.post("/signup", signup)

//SIGNIN USER
router.post("/signin", signin)


export default router