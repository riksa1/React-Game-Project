import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
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
    profilePicture: {
        name: { type: String },
        base64: { type: String },
    }
});

export default mongoose.model("User", userSchema);