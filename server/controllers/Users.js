const express = require('express');
const usersRouter = express.Router();
const userSchema = require("../schemas/User");

usersRouter.post("/", async (req, res) => {
    const newUser = new userSchema(req.body);
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = usersRouter;