import { configureStore } from "@reduxjs/toolkit"
import gamesReducer from "./Games"
import authReducer from "./Auth"

export const store = configureStore({
	reducer: {
		games: gamesReducer,
		auth: authReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = (dispatch: AppDispatch, getState: () => RootState) => void