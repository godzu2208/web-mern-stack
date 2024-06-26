import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import User from "../models/User";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";
const router = express.Router();

router.post("/login",
    [
        check("email", "Email is required").isEmail(),
        check("password", "Password is required").isLength({ min: 6 })
    ],
    async (req: Request, res: Response) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({
                message: error.array(),
            })
        }
        const { email, password } = req.body;
        try {
            const user = await User.findOne({
                email
            })
            if (!user) {
                return res.status(404).json({
                    message: "Invalid Credentials",
                })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(404).json({
                    message: "Password mismatch",
                })
            }

            const token = jwt.sign(
                { userID: user.id, },
                process.env.JWT_SECRET_KEY as string, {
                expiresIn: "1d",

            }
            )
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 86400000,
            })
            res.status(200).json({
                userID: user._id,
                message: "Login Successfully"
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Something went wrong"
            })
        }
    }
)

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
    res.status(200).send({ userID: req.userID })
})

router.post("/logout", (req: Request, res: Response) => {
    res.cookie("auth_token", "", {
        expires: new Date(0)
    })
    res.status(200).send({ message: "log out backend" })
})

export default router;