import { IRouter } from "express";
import express from "express"
import { googleAuth, signin, signup } from "../controllers/auth";

const router: IRouter = express.Router();


//CREATE USER
router.post("/signup", signup)

//SIGNIN USER
router.post("/signin", signin)

//GOOGLE AUTH
router.post("/google", googleAuth )

export default router