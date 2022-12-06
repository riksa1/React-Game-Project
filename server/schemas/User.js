const mongoose = require("mongoose");

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

module.exports = mongoose.model("User", userSchema);