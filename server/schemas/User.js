const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
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