const express = require('express');
const gamesRouter = express.Router();
const gameSchema = require("../schemas/Game");
const auth = require("../middleware/Auth");

gamesRouter.get("/", async (req, res) => {
    try {
        const games = await gameSchema.find();
        res.status(200).json(games);
    } catch (err) {
        res.status(500).json(err);
    }
});

gamesRouter.post("/", auth, async (req, res) => {
    const newGame = new gameSchema({ ...req.body, creator: req.user._id });
    try {
        const savedGame = await newGame.save();
        res.status(200).json(savedGame);
    } catch (err) {
        res.status(500).json(err);
    }
});

gamesRouter.put("/:id", auth, async (req, res) => {
    try {
        const game = await gameSchema.findById(req.params.id);
        if (game.creator.equals(req.user._id)) {
            await game.updateOne({ ...req.body, creator: req.user._id })
            res.status(200).json("Game updated successfully!");
        } else {
            res.status(403).json("You can only update your own games!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

gamesRouter.delete("/:id", auth, async (req, res) => {
    try {
        const game = await gameSchema.findById(req.params.id);
        if (game.creator.equals(req.user._id)) {
            await game.delete();
            res.status(200).json("Game deleted successfully!");
        } else {
            res.status(403).json("You can only delete your own games!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = gamesRouter;