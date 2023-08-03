import { makeVarPersisted } from "./hooks";
import { User } from "./types";

export const sidebarClosed = makeVarPersisted(
	"sidebarClosed",
	window.innerWidth < 640 ? true : false,
);
export const currentAccountId = makeVarPersisted("currentAccountId", 0);
export const userInfo = makeVarPersisted<User | null>("user", null);

export const symbol = makeVarPersisted("symbol", "");
