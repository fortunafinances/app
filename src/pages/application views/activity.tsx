import { gql } from "@apollo/client";
import Table from "../../components/data/table";
import { useMemo } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { Activity } from "../../utilities/types";

const GET_ACTIVITIES = gql`
	query Activity {
		activity(input: { accId: 1 }) {
			date
			type
			description
			amount
		}
	}
`;

export default function Activity() {
	const cols = useMemo<MRT_ColumnDef<Activity>[]>(
		() => [
			{
				header: "Date",
				accessorKey: "date",
			},
			{
				header: "Type",
				accessorKey: "type",
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
		<div className="h-full w-full overflow-y-clip">
			<Table QUERY={GET_ACTIVITIES} columnData={cols} />
		</div>
	);
}
