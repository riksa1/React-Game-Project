require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT =  process.env.PORT ?? 3001;

app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))

app.get("/", (req, res) => res.send("Hello World!"));

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));