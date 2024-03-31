import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./slices/game-slice";
import authReducer from "./slices/auth-slice";

export const store = configureStore({
  reducer: {
    gameReducer,
    authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
