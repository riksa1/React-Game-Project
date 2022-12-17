import { SET_GAMES, ADD_GAME, EDIT_GAME, DELETE_GAME, SET_SELECTED_GAME } from "../constants/Games"
import { fetchGames, createGame, updateGame, deleteGame } from "../api/Api"
import { setMessage } from "./Messages"

const initialState = { selectedGame: null, games: []}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GAMES:
            return {...state, games: action.payload }
        case ADD_GAME:
            return {...state, games: [...state.games, action.payload] }
        case EDIT_GAME:
            return {
                ...state, 
                games: state.games.map(game => game._id === action.payload._id ? action.payload : game),
                selectedGame: null 
            }
        case DELETE_GAME:
            return {...state, games: state.games.filter(game => game._id !== action.payload) }
        case SET_SELECTED_GAME:
            return {...state, selectedGame: action.payload }
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
        console.log(newGame)
        const { data } = await createGame(newGame)
        dispatch({
            type: ADD_GAME,
            payload: data
        })
        dispatch(setMessage("Game created successfully!"))
        navigate("/games")
    }
}

export const editGame = (id, updatedGame, navigate) => {
    return async dispatch => {
        const { data } = await updateGame(id, updatedGame)
        dispatch({
            type: EDIT_GAME,
            payload: data
        })
        dispatch(setMessage("Game updated successfully!"))
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

export const setSelectedGame = (game) => {
    return async dispatch => {
        dispatch({
            type: SET_SELECTED_GAME,
            payload: game
        })
    }
}

export default reducer