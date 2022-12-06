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

export const signIn = (user, navigate) => {
    return async dispatch => {
        const { data } = await login(user)
        if (data.token) {
            dispatch({
                type: SET_AUTH,
                payload: data
            })
            localStorage.setItem("profile", JSON.stringify(data))
            dispatch(setMessage("Logged in successfully!"))
            navigate("/games")
        } else {
            dispatch(setError("Invalid credentials"))
        }
    }
}

export const signUp = (user, navigate) => {
    return async dispatch => {
        const { data } = await register(user)
        if (data.token) {
            dispatch({
                type: SET_AUTH,
                payload: data
            })
            localStorage.setItem("profile", JSON.stringify(data))
            dispatch(setMessage("Signed up successfully!"))
            navigate("/games")
        } else {
            dispatch(setError(data.message))
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