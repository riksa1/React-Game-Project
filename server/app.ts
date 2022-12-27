/* eslint @typescript-eslint/no-var-requires: "off" */
require("dotenv").config({ path: __dirname+"/.env" })
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import gamesRouter from "./controllers/Games"
import usersRouter from "./controllers/Users"
import testingRouter from "./controllers/Testing"
import { ExpressJsonOptions } from "./types"

const app = express()
const PORT =  process.env.PORT ?? 3001

app.use(express.json({ limit: "30mb", extended: true } as ExpressJsonOptions))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.use("/api/games", gamesRouter)
app.use("/api/users", usersRouter)

if (process.env.NODE_ENV === "test") {
	app.use("/api/testing", testingRouter)
}

mongoose.connect(process.env.MONGODB_URL as string)
	.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
	.catch((error) => console.log(error.message))