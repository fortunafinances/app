import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiSwitchHorizontal } from "react-icons/hi";
import TradeForm from "../../components/input/tradeForm";
import { twMerge } from "tailwind-merge";
import StockInfo from "../../components/data/stockInfo";
import TransferSuccessful from "../../components/popup/successfulNotification";
import ErrorNotification from "../../components/popup/errorNotification";
import { formatDollars } from "../../utilities/common";
import { useQuery, useReactiveVar } from "@apollo/client";
import { currentAccountId } from "../../utilities/reactiveVariables";
import { GET_OVERVIEW } from "../../utilities/graphQL";

export interface TradeProps {
	buyState: React.Dispatch<React.SetStateAction<boolean>>;
}

type State = {
	tradeType: boolean;
};

export default function Trade() {
	const location = useLocation();
	const state: State = location.state as State;
	//if true, BUY screen
	//if false, SELL screen
	const [buy, setBuy] = useState(true);
	const [header, setHeader] = useState("BUY");
	const [switchButton, setSwitchButton] = useState("SELL");

	const accountId = useReactiveVar(currentAccountId);
	type DisplayBar = {
		displayBar: {
			total: number;
			invest: number;
			cash: number;
		};
	};

	const { data } = useQuery<DisplayBar>(GET_OVERVIEW, {
		variables: { accId: accountId ? accountId : 0 },
	});

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
		<>
			<TransferSuccessful transfer={false} modalId="trade_successful" />
			<ErrorNotification
				modalId="insufficient_funds"
				message="Insufficient Funds"
			/>
			<ErrorNotification
				modalId="insufficient_shares"
				message="Insufficient Shares"
			/>
			<div className="md:h-full flex flex-col md:flex-row">
				<div
					className={twMerge(
						"overflow-y-auto bg-[#F9E5E5] w-full md:max-w-[40%]",
						buy && "bg-success",
					)}
				>
					<div className="relative mt-5">
						<div
							className={twMerge(
								"text-[#920000] font-semibold ml-5",
								buy && "text-success-content",
							)}
						>
							<h1 className="text-4xl">{header}</h1>
							<p className="text-xl">
								Cash Available:{" "}
								{formatDollars(data?.displayBar.cash ?? 0)}
							</p>

							<button
								className="absolute top-0 right-10 text-xl flex flex-row items-center"
								onClick={() => {
									setBuy((buy) => !buy);
								}}
							>
								<HiSwitchHorizontal color="black" />
								<p
									className={twMerge(
										"text-success-content font-medium",
										buy && "text-[#920000]",
									)}
								>
									{switchButton}
								</p>
							</button>
						</div>
						<TradeForm buyOrSell={buy} />
					</div>
				</div>
				<div className="md:w-[60%] h-full overflow-y-auto">
					<StockInfo />
				</div>
			</div>
		</>
	);
}
