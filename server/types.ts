import { Request } from "express"
import { Document, Types } from "mongoose"

export interface Game extends Document {
    _id?: Types.ObjectId
    title: string
    description: string
    creator: Types.ObjectId
    createdAt: string
    updatedAt?: string
    tags: string[]
    image?: {
        name: string
        base64: string
    }
    viewCount?: number
}

export interface User extends Document {
    _id?: Types.ObjectId
    name: string
    email: string
    password: string
    createdAt: string
    games?: Types.ObjectId[]
    profilePicture?: {
        name: string
        base64: string
    }
}

export interface ExpressJsonOptions {
    limit?: string
    extended?: boolean
}

export interface AuthRequest extends Request {
    token?: string
    user?: User
}