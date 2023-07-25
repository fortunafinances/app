import { makeVar } from "@apollo/client/cache/inmemory/reactiveVars";
import { makeVarPersisted } from "./hooks";
import { Account } from "./types";
import { getMostRecentMonths } from "./common";

export type User = {
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

export const dateRanges = {
  two: getMostRecentMonths(24),
  full: getMostRecentMonths(12),
  half: getMostRecentMonths(6),
}

export const lineChartDateRange = makeVarPersisted<string[] | null>("lineChartDateRange",
  dateRanges.full);


export const symbol = makeVar("");

export const accounts = makeVarPersisted<Account[]>("accounts", []);
