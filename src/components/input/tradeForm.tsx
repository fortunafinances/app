import { useEffect, useState } from "react";
import { BiDollar } from "react-icons/bi";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { Stock } from "../../utilities/types";
import { formatDollars } from "../../utilities/common";
import {
	currentAccountId,
	symbol,
	userInfo,
} from "../../utilities/reactiveVariables";
import { OrderType, OrderSide } from "../../utilities/types";
import {
	GET_ACTIVITIES,
	GET_ORDERS,
	GET_OVERVIEW,
	GET_PIE_CHART_DATA,
	GET_STOCK_NAMES,
	GET_TOTAL_VALUE,
	MAKE_TRADE,
} from "../../utilities/graphQL";
import StockSearchBar from "./stockSearch";
import { preventMinus } from "../../utilities/common";
import { GraphQLReturnData, Holding } from "../../utilities/types";
import { GET_HOLDINGS } from "../../utilities/graphQL";
import { twMerge } from "tailwind-merge";

interface StockData {
	stocks: Stock[];
}

export interface buyProp {
	buyOrSell: boolean;
}

export default function TradeForm({ buyOrSell }: buyProp) {
	const { loading, error, data } = useQuery<StockData>(GET_STOCK_NAMES);

	const symbolName = useReactiveVar(symbol);
	const accountId = useReactiveVar(currentAccountId);
	const user = useReactiveVar(userInfo);
	const [currStockQuantity, setCurrStockQuantity] = useState(0);
	const [marketState, setMarketState] = useState(true); //true is BUY
	const [quantity, setQuantity] = useState(0);
	const [stockPrice, setStockPrice] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	const [checkQuant, setCheckQuant] = useState(true); //true = submit button is disabled
	const [limitPrice, setLimitPrice] = useState<number | null>();

	type TransferReturnData = {
		insertTrade: string;
	};

	const [placeOrder] = useMutation<TransferReturnData>(MAKE_TRADE, {
		refetchQueries: [
			{ query: GET_HOLDINGS, variables: { accId: accountId } },
			{ query: GET_ORDERS, variables: { accId: accountId } },
			{ query: GET_PIE_CHART_DATA, variables: { accId: accountId } },
			{ query: GET_ACTIVITIES, variables: { accId: accountId } },
			{ query: GET_TOTAL_VALUE, variables: { userId: user!.userId } },
			{ query: GET_OVERVIEW, variables: { accId: accountId } },
		],
	});

	const successModal = document.getElementById(
		"trade_successful",
	) as HTMLDialogElement;

	const insufficientFundsModal = document.getElementById(
		"insufficient_funds",
	) as HTMLDialogElement;

	const insufficientSharesModal = document.getElementById(
		"insufficient_shares",
	) as HTMLDialogElement;

	const handleSubmit = () => {
		placeOrder({
			variables: {
				accID: accountId,
				type: marketState ? OrderType.Market : OrderType.Limit,
				side: buyOrSell ? OrderSide.Buy : OrderSide.Sell,
				ticker: symbolName,
				tradeQty: quantity,
				tradePrice: limitPrice! ?? 0,
			},
		})
			.then((data) => {
				if (data.data?.insertTrade === "Success") {
					successModal.showModal();
				} else if (
					data.data?.insertTrade ===
					"Error: Not enough funds in account"
				) {
					insufficientFundsModal.showModal();
				} else if (
					data.data?.insertTrade ===
					"Error: Not enough shares to sell"
				) {
					insufficientSharesModal.showModal();
				} else {
					console.error("error");
				}
			})
			.catch((error) => console.error(error));
	};

	useEffect(() => {
		if (
			symbolName !== "" &&
			symbolName !== "Select..." &&
			data &&
			marketState
		) {
			const stock = data.stocks.find(
				(element) => element.ticker === symbolName,
			);
			const price = stock!.currPrice;
			setStockPrice(price!);
			setTotalPrice(quantity * stockPrice);
		} else if (
			symbolName !== "" &&
			symbolName !== "Select..." &&
			data &&
			limitPrice
		) {
			setTotalPrice(quantity * limitPrice);
		}
	}, [data, quantity, symbolName, stockPrice, marketState, limitPrice]);

	//to get current stock holdings amount
	interface HoldingsQuery {
		holdings: Holding[] & GraphQLReturnData;
	}

	const { data: holdingsData, refetch } = useQuery<HoldingsQuery>(
		GET_HOLDINGS,
		{
			variables: { accId: accountId },
		},
	);

	useEffect(() => {
		if (marketState) {
			setTotalPrice(stockPrice * quantity);
		} else if (limitPrice !== null && limitPrice !== undefined) {
			if (limitPrice > stockPrice) {
				setTotalPrice(stockPrice * quantity);
			} else {
				setTotalPrice(limitPrice * quantity);
			}
		} else {
			setTotalPrice(0 * quantity);
		}
	}, [limitPrice, marketState, quantity, stockPrice]);

	useEffect(() => {
		refetch()
			.then()
			.catch((error) => {
				console.error(error);
			});
		const currStock = holdingsData?.holdings.find(
			(e) => e.stock.ticker === symbolName,
		);
		if (currStock?.stockQuantity !== undefined)
			setCurrStockQuantity(currStock.stockQuantity);
		else {
			setCurrStockQuantity(0);
		}
	}, [holdingsData?.holdings, symbolName, accountId, refetch]);

	useEffect(() => {
		if (quantity < 1) {
			setCheckQuant(true);
		} else {
			setCheckQuant(false);
		}
	}, [quantity]);

	const onClear = () => {
		setQuantity(0);
		symbol("");
	};

	if (loading) return <>Loading</>;
	if (error) return <></>;

	return (
		<div>
			<div className="m-4 mt-6 flex flex-col gap-3">
				<h1 className="font-semibold text-xl">Symbol</h1>
				<StockSearchBar className="z-40 w-full" tradeType={buyOrSell} />
			</div>
			<div className="m-4 mt-6 flex flex-col gap-3">
				<div>
					<h1 className="font-semibold text-xl">Quantity</h1>
					<p className="text-gray-700">
						Current Holdings: {currStockQuantity}
					</p>
				</div>
				<h2 className="text-xs text-[#FF0000]">
					{checkQuant ? "*required" : null}
					{quantity > 1000000 &&
						"Maximum Stock Quantity Reached: 1,000,000"}
				</h2>
				<div className="flex flex-row justify-between">
					<div className="border-[0px] rounded-[3px] border-[#cccccc] w-full">
						<form id="quantityInput">
							<input
								type="number"
								inputMode="decimal"
								min={1}
								step={1}
								placeholder="0"
								onKeyDown={preventMinus}
								onChange={(e) => {
									setQuantity(Number(e.target.value));
								}}
								value={quantity < 1 ? "" : quantity}
								className="input h-9 w-full border-[1px] rounded-[3px] border-[#cccccc] focus:ring-blue-500 focus:border-blue-500 focus:border-[2px] !outline-none"
							/>
						</form>
					</div>
					{!buyOrSell && (
						<button
							className="ml-2 h-9 text-center min-w-[30%] sm:min-w-[20%] rounded-sm bg-[#e6e6e6] px-2 pr-2 max-[768px]:text-lg text-xs xl:text-xl"
							onClick={() => {
								setQuantity(currStockQuantity);
							}}
						>
							Sell All
						</button>
					)}
				</div>
			</div>
			{/* market limit toggle buttons */}
			<div className="flex flex-row justify-evenly font-semibold [&>button]:w-full px-4 h-10 [&>button]:border border-[#cccccc] rounded-sm">
				<button
					onClick={() => {
						setMarketState(true);
					}}
					className={
						marketState ? "bg-[#e6e6e6] shadow-inner" : "bg-white"
					}
				>
					Market
				</button>
				<button
					onClick={() => {
						setMarketState(false);
					}}
					className={
						!marketState ? "bg-[#e6e6e6] shadow-inner" : "bg-white"
					}
				>
					Limit
				</button>
			</div>
			{!marketState && (
				<span className="m-4 mt-6 flex flex-col gap-3">
					<h1 className="font-semibold text-xl">Limit Price</h1>
					<div className="relative">
						<i className="absolute top-[50%] -translate-y-[50%] align-middle">
							<BiDollar />
						</i>
						<input
							type="number"
							inputMode="decimal"
							min={0}
							step="0.01"
							placeholder="Price"
							onKeyDown={preventMinus}
							className="input h-9 w-full border-[1px] rounded-[3px] border-[#cccccc] focus:ring-blue-500 focus:border-blue-500 focus:border-[2px] !outline-none"
							onChange={(newVal) =>
								setLimitPrice(Number(newVal.target.value))
							}
						/>
					</div>
				</span>
			)}
			<div className="m-4 mt-6 flex flex-row gap-3 font-semibold text-xl">
				<h1>Total Price:</h1>
				{marketState ? (
					<h1>
						{quantity} x {formatDollars(stockPrice)} ={" "}
						{formatDollars(totalPrice)}
					</h1>
				) : (
					<h1>
						{quantity} x{" "}
						{limitPrice === null || limitPrice === undefined
							? formatDollars(0)
							: limitPrice > stockPrice
							? formatDollars(stockPrice)
							: formatDollars(limitPrice)}{" "}
						= {formatDollars(totalPrice)}
					</h1>
				)}
			</div>
			{/* cancel and submit buttons */}
			<div className="flex flex-row justify-end m-4 gap-4 text-xl [&>button]:rounded-md [&>button]:px-3 [&>button]:border-4 [&>button]:font-bold">
				<button
					className="border-[#920000] bg-[#920000] hover:bg-[#f9e5e5] hover:text-[#920000] text-[#f9e5e5]"
					onClick={onClear}
				>
					CLEAR
				</button>
				<button
					disabled={checkQuant}
					className={twMerge(
						"border-success-content text-[#E3FDDC] bg-success-content",
						!checkQuant &&
							"hover:bg-[#e3fddc] hover:text-success-content",
						checkQuant && "opacity-40",
					)}
					onClick={handleSubmit}
				>
					{buyOrSell ? "BUY" : "SELL"}
				</button>
			</div>
		</div>
	);
}
