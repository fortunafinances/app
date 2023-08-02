import React from "react";
import { formatDate } from "../../../utilities/common";

interface OrderProps {
	ticker: string;
	company: string;
	tradeQty: number;
	date: string;
	status: string;
	side: string;
	type: string;
}

const OrderCard: React.FC<OrderProps> = ({
	ticker,
	company,
	tradeQty,
	date,
	status,
	side,
	type
}) => (
	<div className="card card-bordered bg-base-100 selection:shadow-xl">
		<div className="flex flex-row justify-between card-body">
			<div>
				{" "}
				<h2 className="card-title">{tradeQty} x {ticker}</h2>
				<p>{company}</p>
			</div>
			<div className="">
				<h2 className="text-2xl">{side} {type}</h2>
                <p>{status}</p>
				<p>{formatDate(date)}</p>
			</div>
		</div>
	</div>
);

export default OrderCard;
