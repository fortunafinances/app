import { useState } from "react";
import { formatDollars } from "../../utilities/currency";
import { formatDate } from "../../utilities/common";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { userInfo } from "../../utilities/reactiveVariables";

const GET_TOTAL_VALUE = gql`
	query AllAccValue($userId: String!) {
		allAccValue(input: { userId: $userId })
	}
`;

export default function TotalAccountValue() {
	const [date] = useState(new Date());

	const user = useReactiveVar(userInfo);

	const { loading, data } = useQuery<{ allAccValue: number }>(GET_TOTAL_VALUE, {
		variables: { userId: user?.userId },
	});

	return (
		<div className="bg-yellow-400 w-full flex flex-col gap-1 p-2 text-black items-center">
			<p>All Accounts</p>
			<h3 className="text-xl font-bold text-ellipsis">
				{loading ? "loading..." : formatDollars(data!.allAccValue)}
			</h3>
			<p className="text-xs">As of {formatDate(date.toLocaleDateString())}</p>
		</div>
	);
}
