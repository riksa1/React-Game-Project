export interface NewGame {
    title: string,
    description: string,
    image: { base64: string, name: string } | null,
    tags: string[]
}

export interface Game extends NewGame {
    _id: string,
    creator: { _id: string, name: string }
    createdAt: string,
    updatedAt?: string
}

export interface User {
    email: string,
    password: string
}

export interface NewUser extends User {
    name: string,
}

export interface Account extends NewUser {
    _id: string,
    createdAt: string
}

export interface GameState {
    selectedGame: Game | null,
    games: Game[]
}

export interface MessageState {
    error: string | null,
    message: string | null
}

export interface AuthState {
    token: string | null,
    user: Account | null,
    isAuth: boolean
}