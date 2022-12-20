import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../schemas/User";
import { Response, NextFunction } from "express";
import { AuthRequest } from "../types";

const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        let token = req.header("Authorization")
        if (!token) {
            return res.status(401).send({ error: "Please authenticate." });
        }
        token = token.replace("Bearer ", "");
        const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        const user = await User.findById(id);
        if (!user) {
            return res.status(401).send({ error: "Please authenticate." });
        }
        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        res.status(401).send({ error: "Please authenticate." });
    }
};

export default auth;