import mongoose, { Model, Schema } from "mongoose"
import { Game } from "../types"

const gameSchema: Schema = new mongoose.Schema({
	title: { type: String, required: true, minLength: 3, maxLength: 50 },
	description: { type: String, required: true, minLength: 3, maxLength: 1000 },
	creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	tags: [String],
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
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}],
	reviews: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Review"
	}]
})

const GameModel: Model<Game> = mongoose.model<Game>("Game", gameSchema)

export default GameModel