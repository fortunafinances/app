export type Token = {
	accessToken: string;
	idToken: string;
};

export type GraphQLReturnData = {
	__typename: string;
};

export interface Stock {
	ticker: string;
	name: string;
	description: string;
	currPrice: number;
	prevClosePrice?: number;
	sector: string;
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

export enum OrderType {
	Market = "Market",
	Limit = "Limit",
}

export enum OrderSide {
	Buy = "Buy",
	Sell = "Sell",
}