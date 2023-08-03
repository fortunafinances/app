import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useQuery, useReactiveVar } from "@apollo/client";
import { symbol } from "../../utilities/reactiveVariables";
import { Stock } from "../../utilities/types";
import { formatDollars } from "../../utilities/common";
import { percentChange } from "../../utilities/common";
import DataContainer from "../container/dataContainer";
import { StockChart } from "./stockChart";
import { GET_STOCK } from "../../utilities/graphQL";
type StockData = {
	oneStock: Stock;
};

export default function StockInfo() {
	const symbolName = useReactiveVar(symbol);

	const {
		loading: stockLoading,
		error: stockError,
		data: stockData,
	} = useQuery<StockData>(GET_STOCK, {
		variables: { ticker: symbolName },
	});

	if (symbolName === "") {
		return (
			<div className="w-full h-full flex flex-row justify-center items-center text-3xl">
				<p>Search for a stock</p>
			</div>
		);
	}

	if (stockLoading)
		return <span className="loading loading-infinity loading-lg"></span>;
	if (stockError) {
		return (
			<div className="w-full h-full flex flex-row justify-center items-center">
				<DataContainer className="m-2 p-2 w-fit h-fit bg-red-600 text-white text-3xl">
					<h2>{stockError.message}</h2>
				</DataContainer>
			</div>
		);
	}

	const company = stockData?.oneStock.name;
	const price = stockData?.oneStock.currPrice;
	const prevPrice = stockData?.oneStock.prevClosePrice;
	const dollarChange = price! - prevPrice!;
	const changePercent = percentChange(price!, prevPrice!);
	const description = stockData?.oneStock.description;

	return (
		<div className="flex-1 overflow-y-auto">
			<div className="flex flex-col">
				{/* heading: Company name, symbol, stock price */}
				<div className="flex justify-between md:flex-row lg:gap-20 m-3">
					<div className="flex flex-col gap-2">
						<h1 className="text-3xl md:text-6xl font-semibold">
							{company}
						</h1>
						<h2 className="text-2xl md:text-4xl text-[#929292]">
							{symbolName}
						</h2>
					</div>
					<div className="flex flex-col gap-6 items-end md:items-start">
						<h1 className="text-4xl text-primary font-medium">
							{formatDollars(price)}
						</h1>
						<div className="flex flex-row text-primary font-semibold text-xl items-center w-fit">
							{dollarChange > 0 ? (
								<AiFillCaretUp />
							) : (
								<AiFillCaretDown />
							)}
							<p className="w-fit">
								{formatDollars(dollarChange)} ({changePercent}%)
								Today
							</p>
						</div>
					</div>
				</div>
				{/* Graph */}
				<div className="m-6 flex flex-col gap-3">
					<DataContainer className=" h-full w-full flex flex-col justify-center border-0 bg-transparent mb-7">
						<StockChart stockName={symbolName} />
					</DataContainer>
					{/* About the Company */}
					<div className="text-4xl font-medium ">About {company}</div>
					<p>{description}</p>
				</div>
			</div>
		</div>
	);
}
