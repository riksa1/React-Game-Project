import { SET_ERROR, SET_MESSAGE } from "../constants/Games"

const initialState = { error: null, message: null }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return { ...state, error: action.payload }
        case SET_MESSAGE:
            return { ...state, message: action.payload }
        default:
            return state
    }
}

export const setError = (error) => {
    return async dispatch => {
        dispatch({
            type: SET_ERROR,
            payload: error
        })
    }
}

export const setMessage = (message) => {
    return async dispatch => {
        dispatch({
            type: SET_MESSAGE,
            payload: message
        })
    }
}

export default reducer
