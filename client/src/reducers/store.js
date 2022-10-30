import { configureStore } from "@reduxjs/toolkit";

import gamesReducer from "./Games";
import authReducer from "./Auth";

export const store = configureStore({
    reducer: {
        games: gamesReducer,
        auth: authReducer,
    },
});

export default store;