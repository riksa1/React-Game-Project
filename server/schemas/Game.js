const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true, minLength: 3, maxLength: 50 },
    description: { type: String, required: true, minLength: 3, maxLength: 500 },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tags: [String],
    image: {
        name: { type: String, required: true },
        base64: { type: String, required: true },
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("Game", gameSchema);