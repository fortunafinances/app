export type Holding = {
	ticker: string;
	name: string;
	stockQuantity: number;
	price: number;
	value: string;
};


export type Activity = {
	date: Date;
	type: "Trade" | "Transfer";
	description: string;
	amount: number;
};

export type Stock = {
	ticker: string;
	currPrice: number;
};
