export type SortOptions = "title 1" | "title -1" | "createdAt 1" | "createdAt -1" | "viewedBy 1" | "viewedBy -1" | "reviews.rating 1" | "reviews.rating -1"

export type Theme = "light" | "dark"

export interface Image {
    base64: string
    name: string
}

export interface User {
    email: string
    password: string
}

export interface NewUser extends User {
    name: string
    confirmPassword: string
}

export interface Account extends NewUser {
    _id: string
    createdAt: string
    profilePicture?: { base64: string, name: string } | null
}

export interface NewReview {
    description?: string
    rating: number
}

export interface Review extends NewReview {
    _id: string
    game: { _id: string, title: string }
    creator: Account
    createdAt: string
    updatedAt: string
}

export interface NewGame {
    title: string
    description: string
    image: { base64: string, name: string } | null
    tags: string[]
    developer: string
    releaseDate: string
}

export interface Game extends NewGame {
    _id: string
    creator: { _id: string, name: string }
    createdAt: string
    updatedAt: string
    viewedBy: string[]
    reviews: Review[]
    averageRating: number
}

export interface User {
    email: string
    password: string
}

export interface NewUser extends User {
    name: string
    confirmPassword: string
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
    loading: boolean
    ownLatestGames: Game[]
    latestGames: Game[]
}

export interface MessageState {
    error: string | null
    message: string | null
}

export interface AuthState {
    token: string | null
    user: Account | null
    isAuth: boolean
    theme: Theme
}

export interface SearchGames {
    search: string
    page: number
    limit?: number
    sort: SortOptions
    userId?: string
}

export interface GameSearchResult extends SearchGames {
    total: number
    docs: Game[]
}