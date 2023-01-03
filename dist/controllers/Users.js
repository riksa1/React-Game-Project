"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../schemas/User"));
const Game_1 = __importDefault(require("../schemas/Game"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Auth_1 = __importDefault(require("../middleware/Auth"));
const usersRouter = express_1.default.Router();
usersRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email: email });
        if (!user) {
            res.status(401).send({ error: "Invalid email or password" });
        }
        else {
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (isMatch) {
                const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
                res.status(200).json({ token: token, user: user });
            }
            else {
                res.status(401).send({ error: "Invalid email or password" });
            }
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
usersRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, confirmPassword } = req.body;
    try {
        const user = yield User_1.default.findOne({ email: email });
        if (user) {
            res.status(409).send({ error: "User with that email already exists" });
        }
        else {
            if (password !== confirmPassword) {
                res.status(400).send({ error: "Passwords do not match" });
            }
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const newUser = new User_1.default({
                name: name,
                email: email,
                password: hashedPassword,
            });
            yield newUser.save();
            const token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.JWT_SECRET);
            res.status(200).json({ token: token, user: newUser });
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
usersRouter.put("/:id", Auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authUser = req.user;
    const { id } = req.params;
    const { name, email, profilePicture } = req.body;
    try {
        const user = yield User_1.default.findById(id);
        if (user && authUser._id.equals(user._id)) {
            user.name = name;
            user.email = email;
            user.profilePicture = profilePicture ? profilePicture : user === null || user === void 0 ? void 0 : user.profilePicture;
            yield user.save();
            res.status(200).json(user);
        }
        else {
            res.status(404).send({ error: "User not found" });
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
usersRouter.put("/:id/reset-password", Auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authUser = req.user;
    const { id } = req.params;
    const { oldPassword, password, confirmPassword } = req.body;
    try {
        const user = yield User_1.default.findById(id);
        if (user && authUser._id.equals(user._id)) {
            if (password !== confirmPassword) {
                res.status(400).send({ error: "Passwords do not match" });
            }
            else {
                const isMatch = yield bcryptjs_1.default.compare(oldPassword, user.password);
                if (isMatch) {
                    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                    user.password = hashedPassword;
                    yield user.save();
                    res.status(200).send({ message: "Password updated successfully" });
                }
                else {
                    res.status(401).send({ error: "Incorrect password" });
                }
            }
        }
        else {
            res.status(404).send({ error: "User not found" });
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
usersRouter.delete("/:id", Auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authUser = req.user;
    const { id } = req.params;
    try {
        if (!authUser._id.equals(id))
            return res.status(401).send({ error: "You can only delete your own account" });
        yield User_1.default.findByIdAndDelete(id);
        yield Game_1.default.deleteMany({ creator: id });
        res.status(200).send({ message: "User deleted successfully" });
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
exports.default = usersRouter;
