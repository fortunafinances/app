import Select, { FormatOptionLabelMeta } from "react-select";
import { twMerge } from "tailwind-merge";
import { symbol } from "../../utilities/reactiveVariables";
import { useQuery, useReactiveVar } from "@apollo/client";
import { GET_STOCK_NAMES } from "../../utilities/graphQL";
import { Stock } from "../../utilities/types";
import { useNavigate } from "react-router-dom";

type Dropdown = {
	label: string;
	value: string;
};
type StockData = {
	stocks: Stock[];
};
export default function SearchBar() {
	const navigate = useNavigate();
	const symbolName = useReactiveVar(symbol);
	const { loading, error, data } = useQuery<StockData>(GET_STOCK_NAMES);

	if (loading) return <>...</>;
	if (error) return <>Error: {error.message}</>;

	return (
		<form className="form-control grow mx-2">
			<Select
				options={
					data
						? data.stocks.map((stock) => {
								return { label: stock.ticker, value: stock.name! };
						  })
						: []
				}
				formatOptionLabel={formatOptionLabel}
				placeholder="Search"
				value={{ label: symbolName, value: symbolName }}
				onChange={(e) => {
					symbol(e?.label);
					navigate("/app/trade", { state: { tradeType: true } });
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
	meta: FormatOptionLabelMeta<Dropdown>
) => {
	if (props.label.length === 0 || props.value.length === 0)
		return <div className="text-gray-500">Search for a stock</div>;
	return (
		<div className="flex flex-row items-center gap-2">
			<div>{props.label}</div>
			<p>|</p>
			<div className={twMerge(meta.context === "value" && "text-gray-500")}>
				{props.value}
			</div>
		</div>
	);
};
