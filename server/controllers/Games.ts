import express, { Response } from "express"
import gameSchema from "../schemas/Game"
import userSchema from "../schemas/User"
import reviewSchema from "../schemas/Review"
import auth from "../middleware/Auth"
import { AuthRequest, Game, User, GameSearchOptions, GameQuery, Review } from "../types"

const gamesRouter = express.Router()

gamesRouter.get("/", async (_req, res: Response) => {
	try {
		const games = await gameSchema.find().populate("creator", "name")
		res.status(200).json(games)
	} catch (err) {
		res.status(500).json(err)
	}
})

gamesRouter.post("/search/paginate", async (req, res: Response) => {
	const { search, page, limit, sort, userId } = req.body
	try {
		const skip = (page - 1) * limit
		const sortField = sort.split(" ")[0]
		const sortOrder = sort.split(" ")[1] === "1" ? 1 : -1
		const options: GameSearchOptions = {
			sort: { [sortField]: sortOrder }
		}
		const query: GameQuery = {
			$or: [
				{ title: new RegExp(search, "i") },
				{ tags: new RegExp(search, "i") }
			]
		}

		if(userId) {
			query.creator = userId
		}

		if(limit) {
			options.skip = skip
			options.limit = parseInt(limit)
		}

		const games = await gameSchema.find(query, null, options).populate({
			path: "creator",
			select: "name"
		}).populate({
			path: "reviews",
			populate: {
				path: "creator",
			}
		})

		const total = await gameSchema.countDocuments(query)

		res.status(200).send({
			docs: games,
			total: total,
			limit: parseInt(limit),
			page: parseInt(page),
			sort: sort
		})
	} catch (err) {
		res.status(500).json(err)
	}
})

gamesRouter.post("/", auth, async (req: AuthRequest, res: Response) => {
	const user = req.user as User
	const newGame = new gameSchema({ ...req.body, creator: req.user && req.user._id })
	try {
		const savedGame = await newGame.save()
		await userSchema.findByIdAndUpdate(user._id, { $push: { games: savedGame._id } })
		res.status(200).json(savedGame)
	} catch (err) {
		res.status(500).json(err)
	}
})

gamesRouter.put("/:id", auth, async (req: AuthRequest, res: Response) => {
	const user = req.user as User
	try {
		const game: Game | null = await gameSchema.findById(req.params.id)
		if (!game) {
			return res.status(404).json({ error: "Game not found!" })
		}
		if (user._id.equals(game.creator)) {
			await game.updateOne({ ...req.body, updatedAt: new Date() })
			res.status(200).json({ message: "Game updated successfully!" })
		} else {
			res.status(403).json({ error: "You can only update your own games!" })
		}
	} catch (err) {
		res.status(500).json(err)
	}
})

gamesRouter.delete("/:id", auth, async (req: AuthRequest, res: Response) => {
	const user = req.user as User
	try {
		const game: Game | null = await gameSchema.findById(req.params.id)
		if (!game) {
			return res.status(404).json({ error: "Game not found!" })
		}
		if (user._id.equals(game.creator)) {
			await game.delete()
			res.status(200).json({ message: "Game deleted successfully!" })
		} else {
			res.status(403).json({ error: "You can only delete your own games!" })
		}
	} catch (err) {
		res.status(500).json(err)
	}
})

gamesRouter.put("/:id/view", auth, async (req: AuthRequest, res: Response) => {
	const user = req.user as User
	try {
		const game: Game | null = await gameSchema.findById(req.params.id)
		if (!game) {
			return res.status(404).json({ error: "Game not found!" })
		}
		if (!game.viewedBy.includes(user._id)) {
			await game.updateOne({ $push: { viewedBy: user._id } })
		}
		res.status(200).json({ message: "Game viewed successfully!" })
	} catch (err) {
		res.status(500).json(err)
	}
})

gamesRouter.post("/:id/review", auth, async (req: AuthRequest, res: Response) => {
	const user = req.user as User
	try {
		const game: Game | null = await gameSchema.findById(req.params.id).populate("reviews")
		if (!game) {
			return res.status(404).json({ error: "Game not found!" })
		}
		const reviews = game.reviews as Review[]
		if (!reviews.find((review: Review) => review.creator.equals(user._id))) {
			const review = new reviewSchema({ ...req.body, game: game._id, creator: user._id })
			await review.save()
			await game.updateOne({ $push: { reviews: review._id } })
		}
		const newReview = await reviewSchema.findOne({ creator: user._id, game: game._id }).populate("creator")
		res.status(200).json(newReview)
	} catch (err) {
		res.status(500).json(err)
	}
})

export default gamesRouter