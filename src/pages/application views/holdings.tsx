import { MRT_ColumnDef } from "material-react-table";
import Table from "../../components/data/table";
import { gql } from "@apollo/client";
import { filterRange, formatCentsToDollars } from "../../utilities/currency";
import { Holding } from "../../utilities/types";
import { useMemo } from "react";

const GET_HOLDINGS = gql`
	query GetOrders {
		holdings(input: { accId: 1 }) {
			ticker
			price
			stockQuantity
			name
		}
	}
`;

export default function Holdings() {
	const cols = useMemo<MRT_ColumnDef<Holding>[]>(
		() => [
			{
				header: "Symbol",
				accessorKey: "ticker",
			},
			{
				header: "Name",
				accessorKey: "name",
			},
			{
				header: "Quantity",
				accessorKey: "stockQuantity",
				size: 55,
				filterFn: "between",
				filterVariant: "range",
			},
			{
				header: "Price",
				id: "price",
				filterVariant: "range",
				size: 55,
				accessorFn: (row) => `${formatCentsToDollars(row.price)}`,
				sortingFn: (a, b) => {
					return a.original.price - b.original.price;
				},
				filterFn: (row, _columnIds, filterValue: number[]) =>
					filterRange(row.original.price, _columnIds, filterValue),
			},
			{
				header: "Value",
				id: "value",
				filterVariant: "range",
				size: 55,
				accessorFn: (row) =>
					`${formatCentsToDollars(row.stockQuantity * row.price)}`,
				sortingFn: (a, b) => {
					return (
						a.original.price * a.original.stockQuantity -
						b.original.price * b.original.stockQuantity
					);
				},
				filterFn: (row, _columnIds, filterValue: number[]) =>
					filterRange(
						row.original.price * row.original.stockQuantity,
						_columnIds,
						filterValue
					),
			},
		],
		[]
	);
	return (
		<div className="h-full w-full">
			<Table QUERY={GET_HOLDINGS} columnData={cols} />
		</div>
	);
}
