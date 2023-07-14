import { InMemoryCache } from "@apollo/client/cache";
import { makeVarPersisted } from "./hooks";

const cache = new InMemoryCache();

export const sidebarClosed = makeVarPersisted("sidebarClosed", false);
export const currentAccountId = makeVarPersisted("currentAccountId", 1);
export const accounts = makeVarPersisted("accounts", [
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

export default cache;
