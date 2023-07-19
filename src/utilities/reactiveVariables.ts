import { makeVarPersisted } from "./hooks";

type User = {
	userId: number;
	username: string;
};

export const sidebarClosed = makeVarPersisted("sidebarClosed", false);
export const currentAccountId = makeVarPersisted("currentAccountId", 1);
export const userId = makeVarPersisted<User | null>("user", {
	userId: 0,
	username: "Nolan Gelinas",
});

export const accounts = [
	{
		id: 1,
		name: "Brokerage",
	},
	{
		id: 2,
		name: "College Fund",
	},
	{ id: 3, name: "Extremely Super Duper Long-Named Fund" },
];
