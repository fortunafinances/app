import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface User {
	id: string;
	name: string;
	email: string;
}

export interface Account {
	id: number;
	name: string;
}

interface UserAccount {
	user: User;
	accounts: Account[];
	currentAccountId: string;
}

const initialState: UserAccount = {
	user: {
		id: "1",
		name: "John Doe",
		email: "john@test.com",
	},
	accounts: [
		{
			id: 1,
			name: "Brokerage",
		},
		{
			id: 2,
			name: "College Fund",
		},
	],
	currentAccountId: "defaultAccount",
};

export const userAccountSlice = createSlice({
	name: "userAccount",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
		setAccount: (state, action: PayloadAction<string>) => {
			state.currentAccountId = action.payload;
		},
	},
});

export const { setUser } = userAccountSlice.actions;
export const userAccountSelector = (state: RootState) =>
	state.userAccountReducer;
export default userAccountSlice.reducer;
