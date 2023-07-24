import { makeVar } from "@apollo/client/cache/inmemory/reactiveVars";
import { makeVarPersisted } from "./hooks";
import { Account } from "./types";

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
  full: getMostRecentMonths(12),
  half: getMostRecentMonths(6),
  quarter: getMostRecentMonths(3),
}

export const lineChartDateRange = makeVarPersisted<string[] | null>("lineChartDateRange",
  dateRanges.full);

function getMostRecentMonths(num: number) {
  let today = new Date(); // Get today's date
  let months = []; // Create an empty array for the months
  // add month into months
  for (let i = 1; i <= num; i++) {
    let month = new Date(today.getFullYear(), today.getMonth() - i, 1);
    months.push(month.toLocaleString('default', { month: 'long' }));
  }
  return months.reverse();
}

export const symbol = makeVar("");

export const accounts = makeVarPersisted<Account[]>("accounts", []);
