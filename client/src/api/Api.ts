import axios, { AxiosRequestConfig } from "axios";
import { NewGame, User, Password, EditProfile } from "types";

const API = axios.create({ baseURL: "http://localhost:3001/api" });

API.interceptors.request.use((req: AxiosRequestConfig) => {
    if (localStorage.getItem("profile")) {
        req.headers = req.headers || {};

        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile") || "{}").token
        }`;
    }
    return req;
});

export const login = (user: User) => API.post("/users/login", user);
export const register = (user: User) => API.post("/users/register", user);
export const updateUser = (id: string, updatedUser: EditProfile) => API.put(`/users/${id}`, updatedUser);
export const resetPassword = (id: string, password: Password) => API.put(`/users/reset-password/${id}`, password);
export const deleteUser = (id: string | undefined) => API.delete(`/users/${id}`);
export const fetchGames = () => API.get("/games");
export const createGame = (newGame: NewGame) => API.post("/games", newGame);
export const updateGame = (id: string, updatedGame: NewGame) => API.put(`/games/${id}`, updatedGame);
export const deleteGame = (id: string) => API.delete(`/games/${id}`);
