import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Game, GameState, NewGame, GameSearchResult } from "types"
import { createGame, updateGame, deleteGame, searchGames } from "../api/Api"
import { setMessage } from "./Messages"
import { RootState, AppThunk } from "./store"

const initialState: GameState = { selectedGame: null, games: [], total: 0, limit: 9, page: 1 }

export const gamesSlice = createSlice({
	name: "games",
	initialState,
	reducers: {
		setGames: (state, action: PayloadAction<GameSearchResult>) => {
			state.games = action.payload.docs
			state.total = action.payload.total
			state.limit = action.payload.limit
			state.page = action.payload.page
		},
		addGame: (state, action: PayloadAction<Game>) => {
			state.games = [...state.games, action.payload]
		},
		editGame: (state, action: PayloadAction<Game>) => {
			state.games = state.games.map(game => game._id === action.payload._id ? action.payload : game)
			state.selectedGame = null
		},
		removeGame: (state, action: PayloadAction<string>) => {
			state.games = state.games.filter(game => game._id !== action.payload)
		},
		setSelectedGame: (state, action: PayloadAction<Game | null>) => {
			state.selectedGame = action.payload
		}
	}
})

export const { setGames, addGame, editGame, removeGame, setSelectedGame } = gamesSlice.actions

export const games = (state: RootState) => state.games

export const fetchGamesAsync = (search: string, page: number, limit: number): AppThunk => async dispatch => {
	try {
		const { data } = await searchGames({ search, page, limit })
		console.log(data)
		if(Math.ceil(data.total / data.limit) < data.page) {
			dispatch(setGames({ ...data, page: 1 }))
		} else {
			dispatch(setGames(data))
		}
	} catch (error) {
		console.log(error)
	}
}

export const createGameAsync = (game: NewGame, navigate: (path: string) => void): AppThunk => async dispatch => {
	try {
		await createGame(game)
		dispatch(setMessage("Game created successfully!"))
		navigate("/games")
	} catch (error) {
		console.log(error)
	}
}

export const updateGameAsync = (id: string, game: NewGame, navigate: (path: string) => void): AppThunk => async dispatch => {
	try {
		const { data } = await updateGame(id, game)
		dispatch(editGame(data))
		dispatch(setSelectedGame(null))
		dispatch(setMessage("Game updated successfully!"))
		navigate("/games")
	} catch (error) {
		console.log(error)
	}
}

export const deleteGameAsync = (id: string): AppThunk => async dispatch => {
	try {
		await deleteGame(id)
		dispatch(removeGame(id))
		dispatch(setMessage("Game deleted successfully!"))
	} catch (error) {
		console.log(error)
	}
}

export default gamesSlice.reducer