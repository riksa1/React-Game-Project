import { configureStore } from "@reduxjs/toolkit";

import gamesReducer from "./Games";
import authReducer from "./Auth";
import messagesReducer from "./Messages";

export const store = configureStore({
    reducer: {
        games: gamesReducer,
        auth: authReducer,
        messages: messagesReducer
    },
});

export default store;