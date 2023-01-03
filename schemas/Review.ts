import mongoose, { Model, Schema } from "mongoose"
import { Review } from "../types"

const reviewSchema: Schema = new mongoose.Schema({
	description: { type: String, maxlength: 1000 },
	rating: { type: Number, required: true, min: 0, max: 5 },
	game: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
	creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	createdAt: {
		type: Date,
		default: new Date()
	}
})

const ReviewModel: Model<Review> = mongoose.model<Review>("Review", reviewSchema)

export default ReviewModel