import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    games: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game"
    }],
    createdAt: {
        type: Date,
        default: new Date()
    },
});

export default mongoose.model("User", userSchema);