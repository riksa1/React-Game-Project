import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001/api" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile")).token
        }`;
    }
    return req;
});

export const login = (user) => API.post("/users/login", user);
export const register = (user) => API.post("/users/register", user);
export const fetchGames = () => API.get("/games");
export const createGame = (newGame) => API.post("/games", newGame);
export const deleteGame = (id) => API.delete(`/games/${id}`);
