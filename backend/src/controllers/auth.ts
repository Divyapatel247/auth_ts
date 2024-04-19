import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { signinBody, SigninType, signupBody, SignupType } from "../models/user";
import prisma from "../lib/prisma";

//signin controller
export const signin = async (req: Request, res: Response, err: any) => {
    const requestBody = signinBody.safeParse(req.body);

    if (!requestBody.success) {
        return res.status(411).json({
            message: "Incorrect inputs",
        });
    }

    const userDetails: SigninType = requestBody.data;
    const user = await prisma.user.findFirst({
        where: {
            email: userDetails.email,
            password: userDetails.password,
        },
    });

    if (user) {
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET as string,
        );
        res.cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json({
                // token: token,
                message: "success",
            });
        return;
    }

    res.status(411).json({
        message: "Error while logging in",
    });
};

// signup controller
export const signup = async (req: Request, res: Response, err: any) => {
    const requestBody = signupBody.safeParse(req.body);
    if (!requestBody.success) {
        return res.status(400).json({
            message: "Email already taken / Incorrect inputs",
        });
    }

    const userDetails: SignupType = requestBody.data;
    const existingUser = await prisma.user.findFirst({
        where: {
            username: userDetails.username,
        },
    });
    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs",
        });
    }

    const user = await prisma.user.create({
        data: {
            username: userDetails.username,
            password: userDetails.password,
            email: userDetails.email,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
        },
    });
    const userId = user.id;

    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string);
    res.cookie("access_token", token, {
        httpOnly: true,
    }).json({
        message: "User created successfully",
    });
};

export const googleAuth = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const requestBody = signupBody.safeParse(req.body);
        if (!requestBody.success) {
            return res.status(400).json({
                message: "Email already taken / Incorrect inputs",
            });
        }
        const userDetails: SignupType = requestBody.data;
        const existingUser = await prisma.user.findFirst({
            where: {
                email: req.body.email,
            },
        });
        // const user = await User.findOne({ email: req.body.email });
        if (existingUser) {
            const token = jwt.sign(
                { id: existingUser.id },
                process.env.JWT as string,
            );
            res.cookie("access_token", token, {
                httpOnly: true,
            })
                .status(200)
                .json(existingUser);
        } else {
            const user = await prisma.user.create({
                data: {
                    username: userDetails.username,
                    password: userDetails.password,
                    email: userDetails.email,
                    firstName: userDetails.firstName,
                    lastName: userDetails.lastName,
                },
            });
            const userId = user.id;
            const token = jwt.sign(
                { id: userId },
                process.env.JWT as string,
            );
            res.cookie("access_token", token, {
                httpOnly: true,
            })
                .status(200)
                .json(user);
        }
    } catch (err) {
        next(err);
    }
};
