export type Token = {
	accessToken: string;
	idToken: string;
};

export type User = {
	userId: string;
	email: string;
	picture?: string;
	username?: string;
	firstName?: string;
	lastName?: string;
	phoneNumber?: string;
	onboardingComplete?: boolean;
};

export type GraphQLReturnData = {
	__typename: string;
};

export interface Stock {
	ticker: string;
	name?: string;
	currPrice?: number;
	description?: string;
	prevClosePrice?: number;
	sector?: string;
}
export interface Holding extends GraphQLReturnData {
	stockQuantity: number;
	stock: Stock;
}

export interface Activity extends GraphQLReturnData {
	date: string;
	type: "Trade" | "Transfer";
	description: string;
	amount: number;
}

export interface Order extends GraphQLReturnData {
	type: OrderType;
	side: OrderSide;
	status: OrderStatus;
	tradePrice: number;
	tradeQty: number;
	date: string;
	stock: Stock;
}

export interface Account extends GraphQLReturnData {
	accId: number;
	cash: number;
	name: string;
}

export enum OrderType {
	Market = "Market",
	Limit = "Limit",
}

export enum OrderSide {
	Buy = "Buy",
	Sell = "Sell",
}

export enum OrderStatus {
	Placed = "Placed",
	Executed = "Executed",
}