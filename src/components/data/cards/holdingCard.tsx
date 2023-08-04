import React from "react";
import { formatDollars, percentChange } from "../../../utilities/common";
import { useNavigate } from "react-router-dom";
import { symbol } from "../../../utilities/reactiveVariables";

interface CardProps {
	ticker: string;
	company: string;
	tradeQty: number;
	tradePrice: number;
	prevPrice: number;
}

const CardComponent: React.FC<CardProps> = ({
	ticker,
	company,
	tradeQty,
	tradePrice,
	prevPrice,
}) => {
	const navigate = useNavigate();
	return (
		<div className="card card-bordered bg-base-100 selection:shadow-xl">
			<div className="flex flex-row justify-between card-body">
				<div>
					{/* <button
						onClick={() => {
							symbol(ticker);
							navigate("/app/trade");
						}}
						className="btn text-4xl drop-shadow-md bg-base-100"
					>
						{ticker}
					</button> */}
					<h2 className="card-title text-4xl">{ticker}</h2>
					<p className="text-gray-400 font-bold">{company}</p>
					<h2 className="text-sm">{tradeQty} Shares</h2>
				</div>
				<div className="flex flex-col justify-center items-center">
					<h2 className="text-3xl">{formatDollars(tradePrice)}</h2>
					<p className="text-xl">{percentChange(tradePrice, prevPrice)}%</p>
					<button
						onClick={() => {
							symbol(ticker);
							navigate("/app/trade");
						}}
						className="btn text-lg rounded-lg"
					>TRADE</button>
				</div>
			</div>
		</div>
	);
};

export default CardComponent;
