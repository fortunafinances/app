import { makeVar } from "@apollo/client/cache/inmemory/reactiveVars";
import { makeVarPersisted } from "./hooks";

export const sidebarClosed = makeVarPersisted("sidebarClosed", false);
export const currentAccountId = makeVarPersisted("currentAccountId", 1);
export const accounts = makeVar([
	{
		id: 1,
		name: "Brokerage",
	},
	{
		id: 2,
		name: "College Fund",
	},
	{ id: 3, name: "Extremely Super Duper Long Name Fund" },
]);
