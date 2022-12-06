const express = require('express');
const usersRouter = express.Router();
const userSchema = require("../schemas/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

usersRouter.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await userSchema.findOne({ email: email });
        if (!user) {
            res.status(401).send("Invalid email or password");
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
                res.status(200).json({ token: token, user: user });
            } else {
                res.status(401).send("Invalid email or password");
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

usersRouter.post("/register", async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const user = await userSchema.findOne({ email: email });
        if (user) {
            res.status(409).send("User with that email already exists");
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new userSchema({
                name: name,
                email: email,
                password: hashedPassword,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            res.status(200).json({ token: token, user: newUser });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = usersRouter;