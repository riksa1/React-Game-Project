import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { MessageState } from "types"
import { RootState } from "./store"

const initialState: MessageState = { error: null, message: null }

export const messageSlice = createSlice({
	name: "messages",
	initialState,
	reducers: {
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload
		},
		setMessage: (state, action: PayloadAction<string | null>) => {
			state.message = action.payload
		}
	}
})

export const { setError, setMessage } = messageSlice.actions

export const messages = (state: RootState) => state.messages

export default messageSlice.reducer