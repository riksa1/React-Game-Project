"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Game_1 = __importDefault(require("../schemas/Game"));
const User_1 = __importDefault(require("../schemas/User"));
const Review_1 = __importDefault(require("../schemas/Review"));
const Auth_1 = __importDefault(require("../middleware/Auth"));
const utils_1 = require("../utils/utils");
const gamesRouter = express_1.default.Router();
gamesRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const games = yield Game_1.default.find().populate("creator", "name");
        res.status(200).json(games);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
gamesRouter.post("/search/paginate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, page, limit, sort, userId } = req.body;
    try {
        const skip = (page - 1) * limit;
        const sortField = sort.split(" ")[0];
        const sortOrder = sort.split(" ")[1] === "1" ? 1 : -1;
        const options = {
            sort: { [sortField]: sortOrder }
        };
        const query = {
            $or: [
                { title: new RegExp(search, "i") },
                { tags: new RegExp(search, "i") }
            ]
        };
        if (userId) {
            query.creator = userId;
        }
        if (limit) {
            options.skip = skip;
            options.limit = parseInt(limit);
        }
        const games = yield Game_1.default.find(query, null, options).populate({
            path: "creator",
            select: "name"
        }).populate({
            path: "reviews",
            populate: {
                path: "creator",
            }
        });
        for (const game of games) {
            game.toJSON();
        }
        if (sortField === "reviews.rating") {
            games.sort((a, b) => {
                if (a.averageRating === null && b.averageRating === null) {
                    return 0;
                }
                else if (a.averageRating === null) {
                    return 1;
                }
                else if (b.averageRating === null) {
                    return -1;
                }
                return sortOrder === 1 ? a.averageRating - b.averageRating : b.averageRating - a.averageRating;
            });
        }
        const total = yield Game_1.default.countDocuments(query);
        res.status(200).send({
            docs: games,
            total: total,
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sort
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
gamesRouter.post("/", Auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const game = (0, utils_1.filterBadWordsFromGame)(req.body);
    const newGame = new Game_1.default(Object.assign(Object.assign({}, game), { creator: req.user && req.user._id }));
    try {
        const savedGame = yield newGame.save();
        yield User_1.default.findByIdAndUpdate(user._id, { $push: { games: savedGame._id } });
        res.status(200).json(savedGame);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
gamesRouter.put("/:id", Auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const filteredGame = (0, utils_1.filterBadWordsFromGame)(req.body);
    try {
        const game = yield Game_1.default.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ error: "Game not found!" });
        }
        if (user._id.equals(game.creator)) {
            yield game.updateOne(Object.assign(Object.assign({}, filteredGame), { updatedAt: new Date() }));
            res.status(200).json({ message: "Game updated successfully!" });
        }
        else {
            res.status(403).json({ error: "You can only update your own games!" });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
gamesRouter.delete("/:id", Auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        const game = yield Game_1.default.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ error: "Game not found!" });
        }
        if (user._id.equals(game.creator)) {
            yield game.delete();
            res.status(200).json({ message: "Game deleted successfully!" });
        }
        else {
            res.status(403).json({ error: "You can only delete your own games!" });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
gamesRouter.put("/:id/view", Auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        const game = yield Game_1.default.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ error: "Game not found!" });
        }
        if (!game.viewedBy.includes(user._id)) {
            yield game.updateOne({ $push: { viewedBy: user._id } });
        }
        res.status(200).json({ message: "Game viewed successfully!" });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
gamesRouter.post("/:id/review", Auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        const game = yield Game_1.default.findById(req.params.id).populate("reviews");
        if (!game) {
            return res.status(404).json({ error: "Game not found!" });
        }
        const reviews = game.reviews;
        if (!reviews.find((review) => review.creator.equals(user._id))) {
            const review = new Review_1.default(Object.assign(Object.assign({}, req.body), { game: game._id, creator: user._id }));
            yield review.save();
            yield game.updateOne({ $push: { reviews: review._id } });
        }
        const newReview = yield Review_1.default.findOne({ creator: user._id, game: game._id }).populate("creator");
        res.status(200).json(newReview);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
exports.default = gamesRouter;
