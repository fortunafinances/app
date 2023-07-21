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

export const symbol = makeVar("");

export const accounts = makeVarPersisted<Account[]>("accounts", []);