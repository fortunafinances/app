import { makeVar } from "@apollo/client/cache/inmemory/reactiveVars";
import { makeVarPersisted } from "./hooks";

type User = {
  userId: string;
  username: string;
  nickname: string;
  email: string;
  picture: string;
  dateOfBirth: string;
};

export const sidebarClosed = makeVarPersisted("sidebarClosed", false);
export const currentAccountId = makeVarPersisted("currentAccountId", 1);
export const userInfo = makeVarPersisted<User | null>("user", {
  userId: "",
  username: "",
  nickname: "",
  email: "",
  picture: "",
  dateOfBirth: "",
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
