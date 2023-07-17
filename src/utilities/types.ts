export type Order = {
  ticker: string;
  name: string;
  stockQuantity: number;
  price: number;
  value: string;
};

export type Stock = {
  ticker: string;
  currPrice: number;
};
