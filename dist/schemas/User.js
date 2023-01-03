"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    games: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Game"
        }],
    createdAt: {
        type: Date,
        default: new Date()
    },
    profilePicture: {
        name: { type: String },
        base64: { type: String },
    }
});
const UserModel = mongoose_1.default.model("User", userSchema);
exports.default = UserModel;
