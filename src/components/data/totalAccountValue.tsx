import { useState } from "react";
import { formatDollars } from "../../utilities/common";
import { formatDate } from "../../utilities/common";
import { useQuery, useReactiveVar } from "@apollo/client";
import { userInfo } from "../../utilities/reactiveVariables";
import { GET_TOTAL_VALUE } from "../../utilities/graphQL";

export default function TotalAccountValue() {
	const [date] = useState(new Date());

	const user = useReactiveVar(userInfo);

	const { loading, error, data } = useQuery<{ allAccValue: number }>(
		GET_TOTAL_VALUE,
		{
			variables: { userId: user?.userId },
		}
	);

	return (
		<div className="bg-primary w-full flex flex-col gap-1 p-2 text-white items-center">
			<p>All Accounts</p>
			<h3 className="text-xl font-bold text-ellipsis">
				{loading
					? "loading..."
					: error
					? "Error"
					: formatDollars(data!.allAccValue)}
			</h3>
			<p className="text-xs">As of {formatDate(date.toISOString())}</p>
		</div>
	);
}
