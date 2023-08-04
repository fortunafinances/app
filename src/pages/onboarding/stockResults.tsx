import { useQuery } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import { GET_ONE_STOCK } from "../../utilities/graphQL";
import { symbol } from "../../utilities/reactiveVariables";
import { formatDollars } from "../../utilities/common";

type StockData = {
	oneStock: {
		name: string;
		currPrice: GLfloat;
	};
};

export default function StockResults() {
	const state = useLocation().state as { parameter: string };
	const parameter = state.parameter;

	function extractStringArray(inputString: string) {
		const regex = /\[.*?\]/; // Match anything between square brackets
		const match = inputString.match(regex);

		if (match) {
			const arrayString = match[0]; // Extract the first match
			try {
				const array = JSON.parse(arrayString) as string[]; // Parse the string as JSON array
				if (Array.isArray(array)) {
					return array;
				}
			} catch (error) {
				console.error("Invalid string array format.");
			}
		}
		return []; // Return an empty array if no valid string array is found
	}

	const tickers = extractStringArray(parameter);
	// console.log(tickers);

	const SuggestionButton = ({
		symbol,
		onClick,
		key,
	}: {
		symbol: string;
		onClick: () => void;
		key: string | number;
	}) => {
		const {
			loading,
			error,
			data: stockData,
		} = useQuery<StockData>(GET_ONE_STOCK, {
			variables: { ticker: symbol },
		});
		if (loading)
			return (
				<span className="loading loading-infinity loading-lg"></span>
			);
		if (error) {
			return (
				<div className="w-full h-full flex flex-row justify-center items-center">
					<h2>{error.message}</h2>
				</div>
			);
		}
		const title = stockData?.oneStock.name as string;
		const price = stockData?.oneStock.currPrice as number;
		return (
			<button
				key={key}
				className="w-full px-5 py-2.5  overflow-hidden font-medium bg-transparent-50 text-gray-600 border-2 border-[#2a0066] hover:border-primary hover:bg-secondary hover:bg-opacity-40 hover:text-success-600 rounded-md m-1"
				onClick={onClick}
			>
				<div className="flex flex-row justify-between items-center font-bold text-xl">
					<div className=" top-1 text-left">
						<div className="text-primary ">
							{title} | {symbol}
						</div>
					</div>
					<div className="align-middle right-1.5 text-green-800 py-0.5 px-2 rounded">
						{formatDollars(price)}
					</div>
				</div>
			</button>
		);
	};

	const navigate = useNavigate();
	function handleBuyStock(item: string) {
		symbol(item);
		navigate("/app/trade");
	}

	return (
		<div className="h-screen flex md:[&>div]:w-[50%]">
			<div className="hidden md:flex flex-col items-center justify-center gap-5 bg-primary text-accent p-8">
				<h1 className="font-semibold text-left md:text-8xl text-5xl">
					Your First Investment
				</h1>
			</div>
			<div className="bg-accent overflow-y-auto p-4 text-primary">
				<h1 className="text-6xl font-bold">Buy A Stock</h1>
				<hr className="h-[2px] my-8 bg-primary border-0"></hr>
				<div className="App">
					<center>
						{tickers.map((item, i) => {
							return (
								<SuggestionButton
									symbol={item}
									onClick={() => handleBuyStock(item)}
									key={i}
								/>
							);
						})}
						<button
							className={`mt-5 text-xl md:text-2xl flex bg-[#2a0066] text-white flex-1 px-5 py-1 relative group overflow-hidden font-medium border border-[#2a0066] hover:border-primary hover:border-4 hover:bg-white hover:py-0 hover:text-primary rounded m-2`}
							onClick={() => navigate("/app")}
						>
							SKIP
						</button>
					</center>
				</div>
			</div>
		</div>
	);
}
