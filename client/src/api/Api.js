import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001/api" });

export const fetchGames = () => API.get("/games");
export const createGame = (newGame) => API.post("/games", newGame);
export const deleteGame = (id) => API.delete(`/games/${id}`);
