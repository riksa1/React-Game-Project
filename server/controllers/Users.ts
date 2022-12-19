import express, { Request, Response } from "express";
import userSchema from "../schemas/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const usersRouter = express.Router();

usersRouter.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await userSchema.findOne({ email: email });
        if (!user) {
            res.status(401).send({ error: "Invalid email or password" });
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
                res.status(200).json({ token: token, user: user });
            } else {
                res.status(401).send({ error: "Invalid email or password" });
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

usersRouter.post("/register", async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const user = await userSchema.findOne({ email: email });
        if (user) {
            res.status(409).send({ error: "User with that email already exists" });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new userSchema({
                name: name,
                email: email,
                password: hashedPassword,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string);
            res.status(200).json({ token: token, user: newUser });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

export default usersRouter;