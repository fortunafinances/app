import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiSwitchHorizontal } from "react-icons/hi";
import SymbolQuantityLimit from "../input/trade/buySellSymbolQuantityLimit";
import { twMerge } from "tailwind-merge";
import StockInfo from "../input/trade/buySellStockInfo";
import AutoSizer, { Size } from "react-virtualized-auto-sizer";

export interface TradeProps {
	buyState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Trade() {
	const { state } = useLocation();
	//if true, BUY screen
	//if false, SELL screen
	const [buy, setBuy] = useState(true);
	const [header, setHeader] = useState("BUY");
	const [switchButton, setSwitchButton] = useState("SELL");

	useEffect(() => {
		if (buy === false) {
			setHeader("SELL");
			setSwitchButton("BUY");
		} else {
			setHeader("BUY");
			setSwitchButton("SELL");
		}
	}, [buy]);

	useEffect(() => {
		if (state !== null && state !== undefined) {
			const { tradeType } = state;
			setBuy(tradeType);
		}
	}, [state]);

	return (
		<AutoSizer>
			{({ height, width }: Size) => (
				<div style={{ height, width }} className="overflow-y-auto">
					<div className="h-full flex">
						<div
							className={twMerge("bg-[#F9E5E5] w-[35%]", buy && "bg-success")}
						>
							<div className="relative mt-5">
								<div
									className={twMerge(
										"text-[#920000] font-semibold ml-5",
										buy && "text-success-content"
									)}
								>
									<h1 className="text-4xl">{header}</h1>
									<p className="text-xl">Account Name</p>
									<button className="absolute top-0 right-10 text-xl flex flex-row items-center">
										<HiSwitchHorizontal color="black" />
										<div
											className={twMerge(
												"text-success-content font-medium",
												buy && "text-[#920000]"
											)}
											onClick={() => {
												setBuy((buy) => !buy);
											}}
										>
											{switchButton}
										</div>
									</button>
								</div>
								<SymbolQuantityLimit />
							</div>
						</div>
						<div className="flex-1 flex ">
							<StockInfo />
						</div>
					</div>
				</div>
			)}
		</AutoSizer>
	);
}
