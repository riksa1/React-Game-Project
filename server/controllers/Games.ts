import express, { Response, Request } from "express";
import gameSchema from "../schemas/Game";
import userSchema from "../schemas/User";
import auth from "../middleware/Auth";
import { AuthRequest, Game } from "../types";
import { Document } from "mongoose";

const gamesRouter = express.Router();

gamesRouter.get("/", async (_req, res: Response) => {
    try {
        const games = await gameSchema.find().populate("creator", "name");
        res.status(200).json(games);
    } catch (err) {
        res.status(500).json(err);
    }
});

gamesRouter.post("/", auth, async (req: AuthRequest, res: Response) => {
    const newGame = new gameSchema({ ...req.body, creator: req.user._id });
    try {
        const savedGame = await newGame.save();
        await userSchema.findByIdAndUpdate(req.user._id, { $push: { games: savedGame._id } });
        res.status(200).json(savedGame);
    } catch (err) {
        res.status(500).json(err);
    }
});

gamesRouter.put("/:id", auth, async (req: AuthRequest, res: Response) => {
    try {
        const game: Game | null = await gameSchema.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ error: "Game not found!" });
        }
        if (req.user._id.equals(game.creator)) {
            await game.updateOne({ ...req.body, updatedAt: new Date() })
            res.status(200).json({ message: "Game updated successfully!" });
        } else {
            res.status(403).json({ error: "You can only update your own games!" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

gamesRouter.delete("/:id", auth, async (req: AuthRequest, res: Response) => {
    try {
        const game: Game | null = await gameSchema.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ error: "Game not found!" });
        }
        if (req.user._id.equals(game.creator)) {
            await game.delete();
            res.status(200).json({ message: "Game deleted successfully!" });
        } else {
            res.status(403).json({ error: "You can only delete your own games!" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

export default gamesRouter;