import React from "react";
import { formatDollars } from "../../../utilities/currency";

interface CardProps {
	ticker: string;
	company: string;
	tradeQty: number;
	tradePrice: number;
}

const CardComponent: React.FC<CardProps> = ({
	ticker,
	company,
	tradeQty,
	tradePrice,
}) => (
	<div className="card card-bordered bg-base-100 selection:shadow-xl">
		<div className="flex flex-row justify-between card-body">
			<div>
				{" "}
				<h2 className="card-title">{ticker}</h2>
				<p>{company}</p>
			</div>
			<div className="">
				<h2 className="text-2xl">{formatDollars(tradeQty * tradePrice)}</h2>
                <p>{tradeQty} x {formatDollars(tradePrice)}</p>
			</div>
		</div>
	</div>
);

export default CardComponent;
