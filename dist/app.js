"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint @typescript-eslint/no-var-requires: "off" */
require("dotenv").config({ path: __dirname + "/.env" });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors")); // dev
const path_1 = __importDefault(require("path"));
const Games_1 = __importDefault(require("./controllers/Games"));
const Users_1 = __importDefault(require("./controllers/Users"));
const Testing_1 = __importDefault(require("./controllers/Testing"));
const RateLimiter_1 = __importDefault(require("./utils/RateLimiter"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use(express_1.default.json({ limit: "30mb", extended: true }));
app.use(express_1.default.urlencoded({ limit: "30mb", extended: true }));
app.use((0, cors_1.default)()); // dev
app.use(express_1.default.static(path_1.default.join(__dirname, "client", "build"))); // prod
app.use(RateLimiter_1.default);
app.use("/api/games", Games_1.default);
app.use("/api/users", Users_1.default);
if (process.env.NODE_ENV === "test") {
    app.use("/api/testing", Testing_1.default);
}
// prod
app.get("*", (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, "client", "build", "index.html"));
});
app.get("/health", (_req, res) => {
    res.send("ok");
});
mongoose_1.default.connect(process.env.MONGODB_URL)
    .then(() => app.listen({ port: PORT, host: "0.0.0.0" }, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));
