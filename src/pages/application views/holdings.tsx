import { MRT_ColumnDef } from "material-react-table";
import Table from "../../components/data/table";
import { gql, useQuery } from "@apollo/client";
import { filterRange, formatDollars } from "../../utilities/currency";
import { GraphQLReturnData, Holding } from "../../utilities/types";
import { useMemo } from "react";

export default function Holdings() {
	const cols = useMemo<MRT_ColumnDef<Holding>[]>(
		() => [
			{
				header: "Symbol",
				accessorKey: "stock.ticker",
			},
			{
				header: "Name",
				accessorKey: "stock.name",
			},
			{
				header: "Quantity",
				accessorKey: "stockQuantity",
				size: 55,
				filterFn: "between",
				filterVariant: "range",
			},
			{
				header: "stock.currPrice",
				id: "stock.currPrice",
				filterVariant: "range",
				size: 55,
				accessorFn: (row) => `${formatDollars(row.stock.currPrice)}`,
				sortingFn: (a, b) => {
					return a.original.stock.currPrice - b.original.stock.currPrice;
				},
				filterFn: (row, _columnIds, filterValue: number[]) =>
					filterRange(row.original.stock.currPrice, _columnIds, filterValue),
			},
			{
				header: "Value",
				id: "value",
				filterVariant: "range",
				size: 55,
				accessorFn: (row) =>
					`${formatDollars(row.stockQuantity * row.stock.currPrice)}`,
				sortingFn: (a, b) => {
					return (
						a.original.stock.currPrice * a.original.stockQuantity -
						b.original.stock.currPrice * b.original.stockQuantity
					);
				},
				filterFn: (row, _columnIds, filterValue: number[]) =>
					filterRange(
						row.original.stock.currPrice * row.original.stockQuantity,
						_columnIds,
						filterValue
					),
			},
		],
		[]
	);

	interface HoldingsQuery {
		holdings: Holding[] & GraphQLReturnData;
	}

	const GET_HOLDINGS = gql`
		query Holdings {
			holdings(input: { accId: 1 }) {
				stockQuantity
				stock {
					ticker
					name
					currPrice
				}
			}
		}
	`;

	const { loading, error, data } = useQuery<HoldingsQuery>(GET_HOLDINGS);

	return (
		<div className="h-full w-full overflow-y-clip">
			<Table
				loading={loading}
				error={error}
				data={data?.holdings}
				columnData={cols}
			/>
		</div>
	);
}
