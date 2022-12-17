import { SET_AUTH, LOGOUT } from "../constants/User"
import { setError, setMessage } from "./Messages"
import { login, register } from "../api/Api"

const initialState = {
    token: null,
    user: null,
    isAuth: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isAuth: true,
            }
        case LOGOUT:
            return initialState
        default:
            return state
    }
}

export const initializeAuth = () => {
    return dispatch => {
        const profile = JSON.parse(localStorage.getItem("profile"))
        if (profile) {
            dispatch({
                type: SET_AUTH,
                payload: profile
            })
        }
    }
}

export const signIn = (user, navigate) => {
    return async dispatch => {
        try {
            const { data } = await login(user)
            if (data.token) {
                dispatch({
                    type: SET_AUTH,
                    payload: data
                })
                localStorage.setItem("profile", JSON.stringify(data))
                dispatch(setMessage("Logged in successfully!"))
                navigate("/games")
            }
        } catch (error) {
            dispatch(setError("Invalid credentials"))
            console.log(error)
        }
    }
}

export const signUp = (user, navigate) => {
    return async dispatch => {
        try {
            const { data } = await register(user)
            if (data.token) {
                dispatch({
                    type: SET_AUTH,
                    payload: data
                })
                localStorage.setItem("profile", JSON.stringify(data))
                dispatch(setMessage("Signed up successfully!"))
                navigate("/games")
            }
        } catch (error) {
            dispatch(setError(error?.response?.data || "Something went wrong"))
        }
    }
}

export const logout = () => {
    localStorage.removeItem("profile")
    return {
        type: LOGOUT
    }
}

export default reducer