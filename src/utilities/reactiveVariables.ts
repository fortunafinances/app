import { makeVar } from "@apollo/client/cache/inmemory/reactiveVars";
import { makeVarPersisted } from "./hooks";

type User = {
  userId: number;
  username: string;
};

export const sidebarClosed = makeVarPersisted("sidebarClosed", false);
export const currentAccountId = makeVarPersisted("currentAccountId", 1);
export const userId = makeVarPersisted<User | null>("user", {
  userId: 1,
  username: "Nolan Gelinas",
});

export const symbol = makeVar("");

export const accounts = [
	{
		id: 1,
		name: "Brokerage",
	},
	{
		id: 2,
		name: "Retirement",
	},
	{ id: 3, name: "College Fund" },
];
