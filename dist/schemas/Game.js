"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const gameSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true, minLength: 3, maxLength: 100 },
    description: { type: String, required: true, minLength: 3, maxLength: 1000 },
    creator: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    tags: [String],
    developer: { type: String, minLength: 3, maxLength: 100, required: true },
    releaseDate: { type: Date, required: true },
    image: {
        name: { type: String },
        base64: { type: String },
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
    },
    viewedBy: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User"
        }],
    reviews: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Review"
        }]
});
gameSchema.virtual("averageRating").get(function () {
    if (this.reviews.length === 0) {
        return null;
    }
    const reviews = this.reviews;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return total / this.reviews.length;
});
gameSchema.set("toObject", { virtuals: true });
gameSchema.set("toJSON", { virtuals: true });
const GameModel = mongoose_1.default.model("Game", gameSchema);
exports.default = GameModel;
