import { MRT_ColumnDef } from "material-react-table";
import Table from "../../components/data/table";
import { gql } from "@apollo/client";
import { formatCentsToDollars } from "../../utilities/currency";
import { Order } from "../../types";
import { useMemo } from "react";

const GET_HOLDINGS = gql`
	query GetOrders {
		holdings {
			ticker
			price
			stockQuantity
			name
		}
	}
`;

export default function Holdings() {
	const cols = useMemo<MRT_ColumnDef<Order>[]>(
		() => [
			{
				accessorKey: "ticker",
				header: "Symbol",
			},
			{
				accessorKey: "name",
				header: "Name",
			},
			{
				accessorKey: "stockQuantity",
				header: "Quantity",
			},
			{
				accessorFn: (row) => `${formatCentsToDollars(row.price)}`,
				id: "price",
				sortingFn: (a, b) => {
					return a.original.price - b.original.price;
				},
				header: "Price",
			},
			{
				accessorFn: (row) =>
					`${formatCentsToDollars(row.stockQuantity * row.price)}`,
				sortingFn: (a, b) => {
					return (
						a.original.price * a.original.stockQuantity -
						b.original.price * b.original.stockQuantity
					);
				},
				id: "value",
				header: "Value",
			},
		],
		[]
	);
	return (
		<div className="">
			<Table QUERY={GET_HOLDINGS} columnData={cols} />
		</div>
	);
}
