import { makeVar } from "@apollo/client";
import { makeVarPersisted } from "./hooks";
import { User } from "./types";

export const sidebarClosed = makeVarPersisted("sidebarClosed", false);
export const currentAccountId = makeVarPersisted("currentAccountId", 0);
export const userInfo = makeVarPersisted<User | null>("user", null);

export const symbol = makeVar("");
