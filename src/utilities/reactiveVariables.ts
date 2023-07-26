import { makeVar } from "@apollo/client/cache/inmemory/reactiveVars";
import { makeVarPersisted } from "./hooks";
import { User } from "./types";
import { getMostRecentMonths } from "./common";

export const sidebarClosed = makeVarPersisted("sidebarClosed", false);
export const currentAccountId = makeVarPersisted("currentAccountId", 0);
export const userInfo = makeVarPersisted<User | null>("user", null);

type DateRanges = {
	two: string[];
	full: string[];
	half: string[];
};

export const dateRanges: DateRanges = {
	two: getMostRecentMonths(24),
	full: getMostRecentMonths(12),
	half: getMostRecentMonths(6),
};

export const lineChartDateRange = makeVarPersisted<string[]>(
	"lineChartDateRange",
	dateRanges.full
);

export const symbol = makeVar("");