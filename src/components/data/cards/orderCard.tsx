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
		<div className="flex flex-row place-items-stretch justify-between card-body">
			<div>
				<h2 className="card-title text-4xl">{ticker}</h2>
				<p className="text-gray-400 font-bold">{company}</p>
				<h2 className="text-sm">{tradeQty} Shares</h2>

			</div>
			<div className="flex flex-col ">
				<h2 className="text-2xl">{side} {type}</h2>
                <p className="font-extrabold">{status}</p>
				<p className="text-sm">{formatDate(date)}</p>

			</div>
		</div>
	</div>
);

export default OrderCard;
