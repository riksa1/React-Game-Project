import { setError, setMessage } from "./Messages"
import { login, register } from "../api/Api"
import { RootState, AppThunk } from "./store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AuthState, NewUser, User } from "types"

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
        }
    }
})

export const { setAuth, logout } = authSlice.actions

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
        console.log(data)
        if (data.token) {
            dispatch(setAuth(data))
            localStorage.setItem("profile", JSON.stringify(data))
            dispatch(setMessage("Logged in successfully!"))
            navigate("/games")
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
            navigate("/games")
        }
    } catch (error) {
        dispatch(setError("Invalid credentials"))
        console.log(error)
    }
}

export const signOut = (navigate: (path: string) => void): AppThunk => async dispatch => {
    dispatch(logout())
    localStorage.removeItem("profile")
    dispatch(setMessage("Logged out successfully!"))
    navigate("/")
}

export default authSlice.reducer