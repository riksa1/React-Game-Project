import { deleteUser, login, register, resetPassword, updateUser } from "../api/Api"
import { RootState, AppThunk } from "./store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Account, AuthState, NewUser, Password, User, EditProfile } from "types"
import toast from "react-hot-toast"
import { AxiosError } from "axios"

const initialState: AuthState = {
	token: null,
	user: null,
	isAuth: false,
	theme: "light"
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
		},
		setTheme: (state, action: PayloadAction<"light" | "dark">) => {
			state.theme = action.payload
		}
	}
})

export const { setAuth, logout, editUser, setTheme } = authSlice.actions

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
			toast.success("Logged in successfully!")
			navigate("/")
		}
	} catch (error) {
		if(error instanceof AxiosError && error?.response?.data?.error) {
			toast.error(error.response.data.error)
		} else {
			toast.error("Failed to log in")
		}
	}
}

export const signUp = (user: NewUser, navigate: (path: string) => void): AppThunk => async dispatch => {
	try {
		const { data } = await register(user)
		if (data.token) {
			dispatch(setAuth(data))
			localStorage.setItem("profile", JSON.stringify(data))
			toast.success("Signed up successfully!")
			navigate("/")
		}
	} catch (error) {
		if(error instanceof AxiosError && error?.response?.data?.error) {
			toast.error(error.response.data.error)
		} else {
			toast.error("Failed to sign up")
		}
	}
}

export const signOut = (navigate: (path: string) => void): AppThunk => async dispatch => {
	localStorage.removeItem("profile")
	dispatch(logout())
	toast.success("Logged out successfully!")
	navigate("/")
}

export const updateUserAsync = (id: string, updatedUser: EditProfile, navigate: (path: string) => void): AppThunk => async dispatch => {
	try {
		const { data } = await updateUser(id, updatedUser)
		dispatch(editUser(data))
		const profile = JSON.parse(localStorage.getItem("profile") || "{}")
		localStorage.setItem("profile", JSON.stringify({ ...profile, user: data }))
		toast.success("Account updated successfully!")
		navigate("/profile")
	} catch (error) {
		if(error instanceof AxiosError && error?.response?.data?.error) {
			toast.error(error.response.data.error)
		} else {
			toast.error("Failed to update account")
		}
	}
}

export const resetPasswordAsync = async (id: string, password: Password, navigate: (path: string) => void) => {
	try {
		await resetPassword(id, password)
		toast.success("Password reset successfully!")
		navigate("/profile")
	} catch (error) {
		if(error instanceof AxiosError && error?.response?.data?.error) {
			toast.error(error.response.data.error)
		} else {
			toast.error("Failed to reset password")
		}
	}
}

export const deleteUserAsync = (id: string | undefined, navigate: (path: string) => void): AppThunk => async dispatch => {
	try {
		await deleteUser(id)
		localStorage.removeItem("profile")
		dispatch(logout())
		toast.success("Account deleted successfully!")
		navigate("/")
	} catch (error) {
		if(error instanceof AxiosError && error?.response?.data?.error) {
			toast.error(error.response.data.error)
		} else {
			toast.error("Failed to delete account")
		}
	}
}

export default authSlice.reducer