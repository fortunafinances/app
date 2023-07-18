export type Token = {
	accessToken: string;
	idToken: string;
};

export type GraphQLReturnData = {
	__typename: string;
};

export interface Holding extends GraphQLReturnData {
	ticker: string;
	name: string;
	stockQuantity: number;
	price: number;
	value: string;
}

export interface Activity extends GraphQLReturnData {
	date: Date;
	type: "Trade" | "Transfer";
	description: string;
	amount: number;
}

export interface Stock {
	ticker: string;
	currPrice: number;
}
