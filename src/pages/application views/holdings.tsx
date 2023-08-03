import { MRT_ColumnDef } from "material-react-table";
import Table from "../../components/data/table";
import { useQuery, useReactiveVar } from "@apollo/client";
import { filterRange, formatDollars } from "../../utilities/common";
import { GraphQLReturnData, Holding } from "../../utilities/types";
import { useMemo } from "react";
import { currentAccountId } from "../../utilities/reactiveVariables";
import { GET_HOLDINGS } from "../../utilities/graphQL";
import NoInvestments from "../../components/data/noInvestments";
import { filterInclusive, isMobile, percentChange } from "../../utilities/common";
import { useWindowSize } from "../../utilities/hooks";
import CardComponent from "../../components/data/cards/holdingCard";

export default function Holdings() {
	const windowSize = useWindowSize();
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
				filterFn: filterInclusive,
				filterVariant: "range",
			},
			{
				header: "Price",
				id: "stock.currPrice",
				filterVariant: "range",
				size: 55,
				accessorFn: (row) => `${formatDollars(row.stock.currPrice!)}`,
				sortingFn: (a, b) => {
					return (
						a.original.stock.currPrice! -
						b.original.stock.currPrice!
					);
				},
				filterFn: (row, _columnIds, filterValue: number[]) =>
					filterRange(
						row.original.stock.currPrice!,
						_columnIds,
						filterValue,
					),
			},
			{
				header: "Value",
				id: "value",
				filterVariant: "range",
				size: 55,
				accessorFn: (row) =>
					`${formatDollars(
						row.stockQuantity * row.stock.currPrice!,
					)}`,
				sortingFn: (a, b) => {
					return (
						a.original.stock.currPrice! * a.original.stockQuantity -
						b.original.stock.currPrice! * b.original.stockQuantity
					);
				},
				filterFn: (row, _columnIds, filterValue: number[]) =>
					filterRange(
						row.original.stock.currPrice! *
							row.original.stockQuantity,
						_columnIds,
						filterValue,
					),
			},
			{
				header: "Daily Change",
				id: "dailyChange",
				accessorFn: (row) => {
					const price = row.stock.currPrice;
					const prevPrice = row.stock.prevClosePrice;
					const dollarChange = price! - prevPrice!;
					let ret = "";
					dollarChange > 0 ? ret += "+" : ret += "-";
					ret += formatDollars(Math.abs(dollarChange));
					ret += " (" + percentChange(price!, prevPrice!) + "%)";
					return ret;
				},
			}
		],
		[],
	);

	interface HoldingsQuery {
		holdings: Holding[] & GraphQLReturnData;
	}

	const { loading, error, data } = useQuery<HoldingsQuery>(GET_HOLDINGS, {
		variables: { accId: accountId },
	});

	if (!loading && data?.holdings.length === 0) return <NoInvestments />;

	return (

		<div className="bg-scroll h-full w-full">
			{isMobile(windowSize.width) ? (
				<>
					<div className="flex flex-row justify-center py-3">
						<h1 className="text-2xl font-bold">Holdings</h1>
					</div>
					{data?.holdings.map((holding: Holding) => (
						<CardComponent
							key={holding.stock.ticker}
							ticker={holding.stock.ticker}
							company={holding.stock.name!}
							tradeQty={holding.stockQuantity}
							tradePrice={holding.stock.currPrice!}
							prevPrice={holding.stock.prevClosePrice}
						/>
					))}
				</>
			) : (
				<Table
					loading={loading}
					error={error}
					data={data?.holdings}
					columnData={cols}
					sorting={[{ id: "stock.ticker", desc: false }]}
				/>
			)}
		</div>
	);
}
