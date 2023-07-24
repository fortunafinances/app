import { useState } from "react";
import { formatDollars } from "../../utilities/currency";
import { formatDate } from "../../utilities/common";

export default function TotalAccountValue() {
	const mockData = 1000000;
	const [date] = useState(new Date());
	return (
		<div className="bg-yellow-400 w-full flex flex-col gap-1 p-2 text-black items-center">
			<p>All Accounts</p>
			<h3 className="text-xl font-bold">{formatDollars(mockData)}</h3>
			<p className="text-xs">As of {formatDate(date.toLocaleDateString())}</p>
		</div>
	);
}
