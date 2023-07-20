import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { symbol } from "../../../utilities/reactiveVariables";
import { Stock } from "../../../utilities/types";
import { formatDollars } from "../../../utilities/currency";
import { percentChange } from "../../../utilities/common";

export default function StockInfo() {
	const symbolName = useReactiveVar(symbol);

	const GET_STOCK = gql`
		query OneStock($ticker: String!) {
			oneStock(input: { ticker: $ticker }) {
				name
				currPrice
				prevClosePrice
				description
				ticker
			}
		}
	`;

	type StockData = {
		oneStock: Stock;
	};

	const { loading, error, data } = useQuery<StockData>(GET_STOCK, {
		variables: { ticker: symbolName },
	});

	if (symbolName === "") {
		return (
			<div className="w-full h-full flex flex-row justify-center items-center text-3xl">
				<p>Search for a stock</p>
			</div>
		);
	}

	if (loading)
		return <span className="loading loading-infinity loading-lg"></span>;
	if (error) {
		return <div>{error.message}</div>;
	}

	const company = data?.oneStock.name;
	const price = data?.oneStock.currPrice;
	const prevPrice = data?.oneStock.prevClosePrice;
	const dollarChange = price! - prevPrice!;
	const changePercent = percentChange(price!, prevPrice!);
	const description = data?.oneStock.description;

	return (
		<div className="flex-1 overflow-y-scroll">
			<div className="flex flex-col">
				{/* heading: Company name, symbol, stock price */}
				<div className="flex justify-between md:flex-row lg:gap-20 m-6">
					<div className="flex flex-col gap-5">
						<h1 className="text-6xl font-semibold">{company}</h1>
						<h2 className="text-4xl text-[#929292]">{symbolName}</h2>
					</div>
					<div className="flex flex-col gap-6">
						<h1 className="text-6xl text-primary font-medium">
							{formatDollars(price!)}
						</h1>
						<div className="flex flex-row text-primary font-semibold text-xl items-center">
							{dollarChange > 0 ? <AiFillCaretUp /> : <AiFillCaretDown />}
							<p>
								{formatDollars(dollarChange)} ({changePercent}%) Today
							</p>
						</div>
					</div>
				</div>
				{/* Graph */}
				{/* <div className="h-[50vh] w-[90%] border-4 border-primary m-[5%]"></div> */}
				<div className="m-6 flex flex-col gap-3">
					{/* About the Company */}
					<div className="text-4xl font-medium ">About {company}</div>
					<p>{description}</p>
				</div>
			</div>
		</div>
	);
}
