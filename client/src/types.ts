export type SortOptions = "title 1" | "title -1" | "createdAt 1" | "createdAt -1"

export interface NewGame {
    title: string
    description: string
    image: { base64: string, name: string } | null
    tags: string[]
}

export interface Game extends NewGame {
    _id: string
    creator: { _id: string, name: string }
    createdAt: string
    updatedAt?: string
    viewCount?: number
}

export interface User {
    email: string
    password: string
}

export interface NewUser extends User {
    name: string
}

export interface Account extends NewUser {
    _id: string
    createdAt: string
    profilePicture?: { base64: string, name: string } | null
}

export interface EditProfile {
    name: string
    email: string
    profilePicture?: { base64: string, name: string } | null
}

export interface Password {
    oldPassword: string
    password: string
    confirmPassword: string
}

export interface GameState {
    selectedGame: Game | null
    games: Game[]
    total: number
    limit: number
    page: number
    sort: SortOptions
}

export interface MessageState {
    error: string | null
    message: string | null
}

export interface AuthState {
    token: string | null
    user: Account | null
    isAuth: boolean
    theme: "light" | "dark"
}

export interface SearchGames {
    search: string
    page: number
    limit: number
    sort: SortOptions
}

export interface GameSearchResult extends SearchGames {
    total: number
    docs: Game[]
}