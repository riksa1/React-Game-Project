import { setError, setMessage } from "./Messages"
import { deleteUser, login, register, resetPassword, updateUser } from "../api/Api"
import { RootState, AppThunk } from "./store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Account, AuthState, NewUser, Password, User, EditProfile } from "types"

const initialState: AuthState = {
	token: null,
	user: null,
	isAuth: false,
}

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth: (state, action: PayloadAction<AuthState>) => {
			state.token = action.payload.token
			state.user = action.payload.user
			state.isAuth = true
		},
		logout: (state) => {
			state.token = null
			state.user = null
			state.isAuth = false
		},
		editUser: (state, action: PayloadAction<Account>) => {
			state.user = action.payload
		}
	}
})

export const { setAuth, logout, editUser } = authSlice.actions

export const auth = (state: RootState) => state.auth

export const initializeAuth = (): AppThunk => async dispatch => {
	const profile = JSON.parse(localStorage.getItem("profile") || "{}")
	if (profile.token) {
		dispatch(setAuth(profile))
	}
}

export const signIn = (user: User, navigate: (path: string) => void): AppThunk => async dispatch => {
	try {
		const { data } = await login(user)
		if (data.token) {
			dispatch(setAuth(data))
			localStorage.setItem("profile", JSON.stringify(data))
			dispatch(setMessage("Logged in successfully!"))
			navigate("/")
		}
	} catch (error) {
		dispatch(setError("Invalid credentials"))
		console.log(error)
	}
}

export const signUp = (user: NewUser, navigate: (path: string) => void): AppThunk => async dispatch => {
	try {
		const { data } = await register(user)
		if (data.token) {
			dispatch(setAuth(data))
			localStorage.setItem("profile", JSON.stringify(data))
			dispatch(setMessage("Signed up successfully!"))
			navigate("/")
		}
	} catch (error) {
		dispatch(setError("Invalid credentials"))
		console.log(error)
	}
}

export const signOut = (navigate: (path: string) => void): AppThunk => async dispatch => {
	localStorage.removeItem("profile")
	dispatch(logout())
	dispatch(setMessage("Logged out successfully!"))
	navigate("/")
}

export const updateUserAsync = (id: string, updatedUser: EditProfile, navigate: (path: string) => void): AppThunk => async dispatch => {
	try {
		const { data } = await updateUser(id, updatedUser)
		dispatch(editUser(data))
		const profile = JSON.parse(localStorage.getItem("profile") || "{}")
		localStorage.setItem("profile", JSON.stringify({ ...profile, user: data }))
		dispatch(setMessage("Account updated successfully!"))
		navigate("/profile")
	} catch (error) {
		dispatch(setError("Failed to update account"))
		console.log(error)
	}
}

export const resetPasswordAsync = (id: string, password: Password, navigate: (path: string) => void): AppThunk => async dispatch => {
	try {
		await resetPassword(id, password)
		dispatch(setMessage("Password reset successfully!"))
		navigate("/profile")
	} catch (error) {
		dispatch(setError("Failed to reset password"))
		console.log(error)
	}
}

export const deleteUserAsync = (id: string | undefined, navigate: (path: string) => void): AppThunk => async dispatch => {
	try {
		await deleteUser(id)
		localStorage.removeItem("profile")
		dispatch(logout())
		dispatch(setMessage("Account deleted successfully!"))
		navigate("/")
	} catch (error) {
		dispatch(setError("Failed to delete account"))
		console.log(error)
	}
}

export default authSlice.reducer