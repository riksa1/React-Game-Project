import { SET_GAMES, ADD_GAME } from "../constants/Games"
import { fetchGames, createGame } from "../api/Api"

const initialState = []

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GAMES:
            return action.payload
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

export const addGame = (newGame) => {
    return async dispatch => {
        const { data } = await createGame(newGame)
        dispatch({
            type: ADD_GAME,
            payload: data
        })
    }
}

export default reducer
