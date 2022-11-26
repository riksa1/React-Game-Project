import { SET_GAMES, ADD_GAME, DELETE_GAME } from "../constants/Games"
import { fetchGames, createGame, deleteGame } from "../api/Api"
import { setMessage } from "./Messages"

const initialState = []

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GAMES:
            return action.payload
        case ADD_GAME:
            return [ ...state, action.payload ]
        case DELETE_GAME:
            return state.filter(game => game._id !== action.payload)
        default:
            return state
    }
}

export const initializeGames = () => {
    return async dispatch => {
        const { data } = await fetchGames()
        dispatch({
            type: SET_GAMES,
            payload: data
        })
    }
}

export const addGame = (newGame, navigate) => {
    return async dispatch => {
        const { data } = await createGame(newGame)
        dispatch({
            type: ADD_GAME,
            payload: data
        })
        dispatch(setMessage("Game created successfully!"))
        navigate("/games")
    }
}

export const removeGame = (id) => {
    return async dispatch => {
        await deleteGame(id)
        dispatch({
            type: DELETE_GAME,
            payload: id
        })
        dispatch(setMessage("Game deleted successfully!"))
    }
}

export default reducer