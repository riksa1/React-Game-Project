import express, { Response } from "express"
import gameSchema from "../schemas/Game"
import userSchema from "../schemas/User"

const testingRouter = express.Router()

testingRouter.post("/reset", async (_req, res: Response) => {
	await gameSchema.deleteMany({})
	await userSchema.deleteMany({})

	res.status(204).end()
})

export default testingRouter