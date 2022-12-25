import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Game, GameState, NewGame, GameSearchResult, SortOptions } from "types"
import { createGame, updateGame, deleteGame, searchGames, setGameViewed } from "../api/Api"
import { RootState, AppThunk } from "./store"
import toast from "react-hot-toast"
import { AxiosError } from "axios"

const initialState: GameState = {
	selectedGame: null,
	games: [],
	latestGames: [],
	ownLatestGames: [],
	total: 0,
	limit: 9,
	page: 1,
	sort: "createdAt -1",
	loading: false
}

export const gamesSlice = createSlice({
	name: "games",
	initialState,
	reducers: {
		setGames: (state, action: PayloadAction<GameSearchResult>) => {
			state.games = action.payload.docs
			state.total = action.payload.total
			state.limit = action.payload.limit ? action.payload.limit : state.limit,
			state.page = action.payload.page ? action.payload.page : 1,
			state.sort = action.payload.sort
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
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload
		},
		setLatestOwnGames: (state, action: PayloadAction<Game[]>) => {
			state.ownLatestGames = action.payload
		},
		setLatestGames: (state, action: PayloadAction<Game[]>) => {
			state.latestGames = action.payload
		}
	}
})

export const { setGames, addGame, editGame, removeGame, setSelectedGame, setLoading, setLatestOwnGames, setLatestGames } = gamesSlice.actions

export const games = (state: RootState) => state.games

export const fetchLatestGamesAsync = (): AppThunk => async (dispatch, getState) => {
	const { auth } = getState()
	try {
		dispatch(setLoading(true))
		if(auth.user) {
			const { data } = await searchGames({ search: "", page: 1, limit: 3, sort: "createdAt -1", userId: auth.user._id })
			dispatch(setLatestOwnGames(data.docs))
		}
		const { data } = await searchGames({ search: "", page: 1, limit: 3, sort: "createdAt -1" })
		dispatch(setLatestGames(data.docs))
		dispatch(setLoading(false))
	} catch (error) {
		if(error instanceof AxiosError && error?.response?.data?.error) {
			toast.error(error.response.data.error)
		} else {
			toast.error("Something went wrong!")
		}
		dispatch(setLoading(false))
	}
}


export const searchGamesAsync = (search: string, page: number, limit: number, sort: SortOptions, own: boolean): AppThunk => async (dispatch, getState) => {
	const { auth } = getState()
	try {
		dispatch(setLoading(true))
		const { data } = await searchGames({ search, page, limit, sort, userId: own && auth.user ? auth.user._id : undefined })
		if(Math.ceil(data.total / data.limit) < data.page) {
			dispatch(setGames({ ...data, page: 1 }))
		} else {
			dispatch(setGames(data))
		}
		dispatch(setLoading(false))
	} catch (error) {
		if(error instanceof AxiosError && error?.response?.data?.error) {
			toast.error(error.response.data.error)
		} else {
			toast.error("Something went wrong!")
		}
		dispatch(setLoading(false))
	}
}

export const createGameAsync = async (game: NewGame, navigate: (path: string) => void) => {
	try {
		await createGame(game)
		toast.success("Game created successfully!")
		navigate("/games")
	} catch (error) {
		if(error instanceof AxiosError && error?.response?.data?.error) {
			toast.error(error.response.data.error)
		} else {
			toast.error("Something went wrong!")
		}
	}
}

export const updateGameAsync = (id: string, game: NewGame, navigate: (path: string) => void): AppThunk => async dispatch => {
	try {
		const { data } = await updateGame(id, game)
		dispatch(editGame(data))
		dispatch(setSelectedGame(null))
		toast.success("Game updated successfully!")
		navigate("/games")
	} catch (error) {
		if(error instanceof AxiosError && error?.response?.data?.error) {
			toast.error(error.response.data.error)
		} else {
			toast.error("Something went wrong!")
		}
	}
}

export const deleteGameAsync = (id: string): AppThunk => async dispatch => {
	try {
		await deleteGame(id)
		dispatch(removeGame(id))
		toast.success("Game deleted successfully!")
	} catch (error) {
		if(error instanceof AxiosError && error?.response?.data?.error) {
			toast.error(error.response.data.error)
		} else {
			toast.error("Something went wrong!")
		}
	}
}

export const setGameViewedAsync = (id: string): AppThunk => async (_dispatch, getState) => {
	const { games, auth } = getState()
	try {
		if(auth.user && !games.loading)
			if(!games.games.find(game => game?._id === id)?.viewedBy.includes(auth.user._id))
				await setGameViewed(id)
	} catch (error) {
		if(error instanceof AxiosError && error?.response?.data?.error) {
			toast.error(error.response.data.error)
		} else {
			toast.error("Something went wrong!")
		}
	}
}

export default gamesSlice.reducer