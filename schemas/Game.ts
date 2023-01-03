import mongoose, { Model, Schema } from "mongoose"
import { Game, Review } from "../types"

const gameSchema: Schema = new mongoose.Schema({
	title: { type: String, required: true, minLength: 3, maxLength: 100 },
	description: { type: String, required: true, minLength: 3, maxLength: 1000 },
	creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
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
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}],
	reviews: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Review"
	}]
})

gameSchema.virtual("averageRating").get(function (this: Game) {
	if (this.reviews.length === 0) {
		return null
	}

	const reviews = this.reviews as Review[]
	const total = reviews.reduce((acc: number, review: Review) => acc + review.rating, 0)
	return total / this.reviews.length
})

gameSchema.set("toObject", { virtuals: true })
gameSchema.set("toJSON", { virtuals: true })

const GameModel: Model<Game> = mongoose.model<Game>("Game", gameSchema)

export default GameModel