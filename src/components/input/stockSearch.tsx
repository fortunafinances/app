import Select, { FormatOptionLabelMeta } from "react-select";
import { twMerge } from "tailwind-merge";
import { symbol } from "../../utilities/reactiveVariables";
import { useQuery, useReactiveVar } from "@apollo/client";
import { GET_STOCK_NAMES } from "../../utilities/graphQL";
import { Dropdown, Stock } from "../../utilities/types";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

type StockData = {
	stocks: Stock[];
};
export default function StockSearchBar({
	className,
	tradeType = true,
}: {
	className?: string;
	tradeType?: boolean;
}) {
	const navigate = useNavigate();
	const symbolName = useReactiveVar(symbol);
	const { loading, error, data } = useQuery<StockData>(GET_STOCK_NAMES);

	const getStockName = useCallback(
		(symbol: string) => {
			const stock = data?.stocks.find((stock) => stock.ticker === symbol);
			return stock?.name;
		},
		[data?.stocks],
	);

	if (loading)
		return (
			<div className="grow flex flex-row items-center justify-center">
				<span className="loading loading-dots loading-md" />
			</div>
		);
	if (error)
		return (
			<div className="grow text-red-600 flex flex-row items-center justify-center font-bold">
				Error: {error.message}
			</div>
		);

	return (
		<form
			className={twMerge("form-control grow z-50 cursor-text", className)}
		>
			<Select
				className="cursor-text"
				options={
					data
						? data.stocks.map((stock) => {
								return {
									label: stock.name!,
									value: stock.ticker,
								};
						  })
						: []
				}
				formatOptionLabel={formatOptionLabel}
				placeholder="Search"
				value={{ label: getStockName(symbolName)!, value: symbolName }}
				onChange={(e) => {
					symbol(e?.value);
					navigate("/app/trade", { state: { tradeType: tradeType } });
				}}
				onInputChange={function (): void {}}
				onMenuOpen={function (): void {}}
				onMenuClose={function (): void {}}
			/>
		</form>
	);
}

const formatOptionLabel = (
	props: Dropdown,
	meta: FormatOptionLabelMeta<Dropdown>,
) => {
	if (props?.label?.length === 0)
		return <div className="text-gray-500">Search for a stock</div>;
	return (
		<div className="flex flex-row items-center gap-2">
			<div>{props.label}</div>
			<p>|</p>
			<div
				className={twMerge(meta.context === "value" && "text-gray-500")}
			>
				{props.value}
			</div>
		</div>
	);
};
