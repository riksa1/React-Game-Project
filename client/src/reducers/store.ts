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

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = (dispatch: AppDispatch, getState: () => RootState) => void