import { Request } from "express"
import { Document, Types } from "mongoose"

export interface NewReview extends Document {
    description?: string
    rating: number
    game: Types.ObjectId
}

export interface Review extends NewReview {
    _id: Types.ObjectId
    creator: Types.ObjectId
    createdAt: string
    updatedAt: string
}

export interface NewGame extends Document {
    title: string
    description: string
    tags: string[]
    image?: {
        name: string
        base64: string
    }
}

export interface Game extends NewGame {
    _id: Types.ObjectId
    creator: Types.ObjectId
    createdAt: string
    updatedAt: string
    viewedBy: Types.ObjectId[]
    reviews: Types.ObjectId[] | Review[]
}

export interface NewUser extends Document {
    name: string
    email: string
    password: string
    profilePicture?: {
        name: string
        base64: string
    }
}

export interface User extends NewUser {
    _id: Types.ObjectId
    createdAt: string
    games: Types.ObjectId[]
}

export interface ExpressJsonOptions {
    limit?: string
    extended?: boolean
}

export interface AuthRequest extends Request {
    token?: string
    user?: User
}

export interface GameSearchOptions {
    skip?: number
    limit?: number
    sort?: { [key: string]: number }
}

export interface GameQuery {
    $or?: { [key: string]: RegExp }[]
    creator?: string
}