import { makeVar } from "@apollo/client/cache/inmemory/reactiveVars";
import { makeVarPersisted } from "./hooks";
import { Account, User } from "./types";
import { getMostRecentMonths } from "./common";

export const sidebarClosed = makeVarPersisted("sidebarClosed", false);
export const currentAccountId = makeVarPersisted("currentAccountId", 1);
export const userInfo = makeVarPersisted<User | null>("user", null);

export const dateRanges = {
	full: getMostRecentMonths(12),
	half: getMostRecentMonths(6),
	quarter: getMostRecentMonths(3),
};

export const lineChartDateRange = makeVarPersisted<string[]>(
	"lineChartDateRange",
	dateRanges.full
);


export const symbol = makeVar("");

export const accounts = makeVarPersisted<Account[]>("accounts", []);
