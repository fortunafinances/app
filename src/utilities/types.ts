export type GraphQLReturnData = {
	__typename: string;
};

export interface Stock {
	ticker: string;
	currPrice: number;
	name: string;
}
export interface Holding extends GraphQLReturnData {
	stockQuantity: number;
	stock: Stock;
}

export interface Activity extends GraphQLReturnData {
	date: Date;
	type: "Trade" | "Transfer";
	description: string;
	amount: number;
}

