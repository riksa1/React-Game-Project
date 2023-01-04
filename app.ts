/* eslint @typescript-eslint/no-var-requires: "off" */
require("dotenv").config({ path: __dirname + "/.env" })
import express from "express"
import mongoose from "mongoose"
import cors from "cors" // dev
import path from "path"
import gamesRouter from "./controllers/Games"
import usersRouter from "./controllers/Users"
import testingRouter from "./controllers/Testing"
import { ExpressJsonOptions } from "./types"
import rateLimiter from "./utils/rateLimiter"
const app = express()
const PORT =  process.env.PORT || 8080

app.use(express.json({ limit: "30mb", extended: true } as ExpressJsonOptions))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors()) // dev

app.use(express.static(path.join(__dirname, "..", "client", "build"))) // prod

app.use(rateLimiter)

app.use("/api/games", gamesRouter)
app.use("/api/users", usersRouter)

if (process.env.NODE_ENV === "test") {
	app.use("/api/testing", testingRouter)
}

// prod
app.get("*", (_req, res) => {
	res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"))
})

app.get("/health", (_req, res) => {
	res.send("ok")
})

mongoose.connect(process.env.MONGODB_URL as string)
	.then(() => app.listen({ port: PORT, host: "0.0.0.0" }, () => console.log(`Server running on port ${PORT}`)))
	.catch((error) => console.log(error.message))