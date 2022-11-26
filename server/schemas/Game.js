const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true, minLength: 3, maxLength: 50 },
    description: { type: String, required: true, minLength: 3, maxLength: 500 },
    creator: {
        type: String,
    },
    tags: [String],
    image: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("Game", gameSchema);