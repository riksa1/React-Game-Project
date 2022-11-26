const express = require('express');
const gamesRouter = express.Router();
const gameSchema = require("../schemas/Game");

gamesRouter.get("/", async (req, res) => {
    try {
        const games = await gameSchema.find();
        res.status(200).json(games);
    } catch (err) {
        res.status(500).json(err);
    }
});

gamesRouter.post("/", async (req, res) => {
    const newGame = new gameSchema({ ...req.body, creator: "Riko" });
    try {
        const savedGame = await newGame.save();
        res.status(200).json(savedGame);
    } catch (err) {
        res.status(500).json(err);
    }
});

gamesRouter.delete("/:id", async (req, res) => {
    try {
        const game = await gameSchema.findById(req.params.id);
        await game.delete();
        res.status(200).json("Game deleted successfully!");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = gamesRouter;