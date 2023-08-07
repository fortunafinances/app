import {
	AiFillCaretDown,
	AiFillCaretUp,
	AiFillStar,
	AiOutlineStar,
} from "react-icons/ai";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { currentAccountId, symbol } from "../../utilities/reactiveVariables";
import { Stock, WatchList } from "../../utilities/types";
import { formatDollars, isFav, isMobile } from "../../utilities/common";
import { percentChange } from "../../utilities/common";
import DataContainer from "../container/dataContainer";
import { StockChart } from "./stockChart";
import {
	GET_STOCK,
	GET_WATCH_LIST,
	TOGGLE_WATCH_LIST,
} from "../../utilities/graphQL";
import { useWindowSize } from "../../utilities/hooks";
type StockData = {
	oneStock: Stock;
};

export default function StockInfo() {
	const symbolName = useReactiveVar(symbol);
	const windowSize = useWindowSize().width;

	const {
		loading: stockLoading,
		error: stockError,
		data: stockData,
	} = useQuery<StockData>(GET_STOCK, {
		variables: { ticker: symbolName },
	});

	const {
		loading: favLoading,
		error: favError,
		data: favData,
	} = useQuery<WatchList>(GET_WATCH_LIST, {
		variables: { accId: currentAccountId() },
	});

	const [toggleFav] = useMutation(TOGGLE_WATCH_LIST, {
		variables: { accId: currentAccountId(), ticker: symbolName },
		refetchQueries: [
			{ query: GET_WATCH_LIST, variables: { accId: currentAccountId() } },
		],
	});

	if (symbolName === "") {
		return (
			<div className="w-full h-full flex flex-row justify-center items-center text-3xl">
				<p>Search for a stock</p>
			</div>
		);
	}

	if (stockLoading)
		return (
			<div className="flex w-full h-full justify-center items-center">
				<span className="loading loading-infinity w-[5em]"></span>
			</div>
		);
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
	const changePercent = percentChange(price, prevPrice);
	const description = stockData?.oneStock.description;

	return (
		<div className="flex flex-col">
			{/* heading: Company name, symbol, stock price */}
			<div className="flex justify-between md:flex-row m-2 lg:m-3">
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl md:text-5xl font-semibold">
						{company}
					</h1>
					<div className="flex items-center gap-2">
						<h2 className="text-xl md:text-4xl text-[#929292]">
							{symbolName}
						</h2>
						<button
							onClick={() => {
								toggleFav().catch((err) => console.error(err));
							}}
						>
							{favLoading ? (
								<AiOutlineStar
									size={isMobile(windowSize) ? 30 : 40}
									style={{
										fill: "#2A0066",
									}}
								/>
							) : favError ? (
								<>Watch List Error</>
							) : isFav(favData!.watchList, symbolName) ? (
								<AiFillStar
									size={isMobile(windowSize) ? 30 : 40}
									style={{
										fill: "#2A0066",
									}}
								/>
							) : (
								<AiOutlineStar
									size={isMobile(windowSize) ? 30 : 40}
								/>
							)}
						</button>
					</div>
				</div>
				<div className="flex flex-col gap-4 items-end md:items-start md:text-right">
					<h1 className="text-3xl md:text-5xl text-primary font-medium w-full">
						{formatDollars(price)}
					</h1>
					<div className="flex flex-row text-primary font-semibold text-xl justify-end items-center whitespace-nowrap w-full">
						{dollarChange > 0 ? (
							<AiFillCaretUp />
						) : (
							<AiFillCaretDown />
						)}
						<p className="w-fit text-[18px]">
							{formatDollars(dollarChange)} ({changePercent}%)
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
				<div className="text-4xl font-medium">About {company}</div>
				<p>{description}</p>
			</div>
		</div>
	);
}
