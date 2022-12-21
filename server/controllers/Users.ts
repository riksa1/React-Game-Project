import express, { Request, Response } from "express"
import userSchema from "../schemas/User"
import gameSchema from "../schemas/Game"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import auth from "../middleware/Auth"
import { AuthRequest } from "../types"

const usersRouter = express.Router()

usersRouter.post("/login", async (req: Request, res: Response) => {
	const { email, password } = req.body
	try {
		const user = await userSchema.findOne({ email: email })
		if (!user) {
			res.status(401).send({ error: "Invalid email or password" })
		} else {
			const isMatch = await bcrypt.compare(password, user.password)
			if (isMatch) {
				const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string)
				res.status(200).json({ token: token, user: user })
			} else {
				res.status(401).send({ error: "Invalid email or password" })
			}
		}
	} catch (err) {
		res.status(500).json(err)
	}
})

usersRouter.post("/register", async (req: Request, res: Response) => {
	const { name, email, password } = req.body
	try {
		const user = await userSchema.findOne({ email: email })
		if (user) {
			res.status(409).send({ error: "User with that email already exists" })
		} else {
			const hashedPassword = await bcrypt.hash(password, 10)
			const newUser = new userSchema({
				name: name,
				email: email,
				password: hashedPassword,
			})
			await newUser.save()
			const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string)
			res.status(200).json({ token: token, user: newUser })
		}
	} catch (err) {
		res.status(500).send(err)
	}
})

usersRouter.put("/:id", auth, async (req: AuthRequest, res: Response) => {
	const { id } = req.params
	const { name, email, profilePicture } = req.body
	try {
		const user = await userSchema.findById(id)
		if (user && typeof req.user !== "undefined" && typeof req.user._id !== "undefined" && req?.user?._id.equals(user._id)) {
			user.name = name
			user.email = email
			user.profilePicture = profilePicture ? profilePicture : user?.profilePicture
			await user.save()
			res.status(200).json(user)
		} else {
			res.status(404).send({ error: "User not found" })
		}
	} catch (err) {
		console.log(err, "hmm")
		res.status(500).send(err)
	}
})

usersRouter.put("/reset-password/:id", auth, async (req: AuthRequest, res: Response) => {
	const { id } = req.params
	const { oldPassword, password, confirmPassword } = req.body
	try {
		const user = await userSchema.findById(id)
		if (user && typeof req.user !== "undefined" && typeof req.user._id !== "undefined" && req?.user?._id.equals(user._id)) {
			if (password !== confirmPassword) {
				res.status(400).send({ error: "Passwords do not match" })
			} else {
				const isMatch = await bcrypt.compare(oldPassword, user.password)
				if (isMatch) {
					const hashedPassword = await bcrypt.hash(password, 10)
					user.password = hashedPassword
					await user.save()
					res.status(200).send({ message: "Password updated successfully" })
				} else {
					res.status(401).send({ error: "Incorrect password" })
				}
			}
		} else {
			res.status(404).send({ error: "User not found" })
		}
	} catch (err) {
		res.status(500).send(err)
	}
})

usersRouter.delete("/:id", auth, async (req: AuthRequest, res: Response) => {
	const { id } = req.params
	try {
		if(typeof req.user !== "undefined" && typeof req.user._id !== "undefined" && !req.user._id.equals(id))
			return res.status(401).send({ error: "You can only delete your own account" })
		await userSchema.findByIdAndDelete(id)
		await gameSchema.deleteMany({ creator: id })
		res.status(200).send({ message: "User deleted successfully" })
	} catch (err) {
		res.status(500).send(err)
	}
})


export default usersRouter