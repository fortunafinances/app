import { configureStore } from "@reduxjs/toolkit";
import userAccountReducer from "./reducers/userAccount";

export const store = configureStore({
	reducer: {
		userAccountReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
