import { MRT_ColumnDef } from "material-react-table";
import Table from "../../components/data/table";
import { useQuery, useReactiveVar } from "@apollo/client";
import { filterRange, formatDollars } from "../../utilities/currency";
import { GraphQLReturnData, Holding } from "../../utilities/types";
import { useMemo } from "react";
import { currentAccountId } from "../../utilities/reactiveVariables";
import { GET_HOLDINGS } from "../../utilities/graphQL";
import { Link } from "react-router-dom";

export default function Holdings() {
	const accountId = useReactiveVar(currentAccountId);
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
				header: "Price",
				id: "stock.currPrice",
				filterVariant: "range",
				size: 55,
				accessorFn: (row) => `${formatDollars(row.stock.currPrice!)}`,
				sortingFn: (a, b) => {
					return a.original.stock.currPrice! - b.original.stock.currPrice!;
				},
				filterFn: (row, _columnIds, filterValue: number[]) =>
					filterRange(row.original.stock.currPrice!, _columnIds, filterValue),
			},
			{
				header: "Value",
				id: "value",
				filterVariant: "range",
				size: 55,
				accessorFn: (row) =>
					`${formatDollars(row.stockQuantity * row.stock.currPrice!)}`,
				sortingFn: (a, b) => {
					return (
						a.original.stock.currPrice! * a.original.stockQuantity -
						b.original.stock.currPrice! * b.original.stockQuantity
					);
				},
				filterFn: (row, _columnIds, filterValue: number[]) =>
					filterRange(
						row.original.stock.currPrice! * row.original.stockQuantity,
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

	const { loading, error, data } = useQuery<HoldingsQuery>(GET_HOLDINGS, {
		variables: { accId: accountId },
	});

	if (!loading && data?.holdings.length === 0)
		return (
			<div className="h-full w-full flex flex-col justify-center items-center text-2xl">
				<h2 className="text-5xl">No Holdings Found...</h2>
				<Link to="/app/trade" className="hover:underline underline-offset-8">
					Place your first order
				</Link>
			</div>
		);

	return (
		<div className="h-full w-full overflow-y-clip">
			<Table
				loading={loading}
				error={error}
				data={data?.holdings}
				columnData={cols}
				sorting={[{ id: "stock.ticker", desc: false }]}
			/>
		</div>
	);
}
