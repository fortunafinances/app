import { useQuery, useReactiveVar } from "@apollo/client";
import Table from "../../components/data/table";
import { useMemo } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { Activity, GraphQLReturnData } from "../../utilities/types";
import { filterRange, formatDollars } from "../../utilities/common";
import { formatDate, isMobile, sortDate } from "../../utilities/common";
import { currentAccountId } from "../../utilities/reactiveVariables";
import { GET_ACTIVITIES } from "../../utilities/graphQL";
import ActivityCard from "../../components/data/cards/activityCard";
import { useWindowSize } from "../../utilities/hooks";

export default function Activity() {
	const accountId = useReactiveVar(currentAccountId);
	const windowSize = useWindowSize().width;
	const cols = useMemo<MRT_ColumnDef<Activity>[]>(
		() => [
			{
				header: "Date",
				id: "date",
				accessorFn: (row) => `${formatDate(row.date)}`,
				sortingFn: (a, b) => sortDate(a.original.date, b.original.date),
			},
			{
				header: "Type",
				accessorKey: "type",
				filterVariant: "select",
				filterSelectOptions: ["Transfer", "Trade"],
			},
			{
				header: "Description",
				accessorKey: "description",
				size: 110,
			},
			{
				header: "Amount",
				id: "amount",
				filterVariant: "range",
				size: 55,
				accessorFn: (row) => `${formatDollars(row.amount)}`,
				sortingFn: (a, b) => {
					return a.original.amount - b.original.amount;
				},
				filterFn: (row, _columnIds, filterValue: number[]) =>
					filterRange(row.original.amount, _columnIds, filterValue),
			},
		],
		[],
	);

	type ActivitiesQuery = {
		activity: Activity[] & GraphQLReturnData;
	};

	const { loading, error, data } = useQuery<ActivitiesQuery>(GET_ACTIVITIES, {
		variables: { accId: accountId },
	});

	if (data?.activity.length === 0)
		return (
			<div className="h-full w-full flex flex-col justify-center items-center text-2xl">
				<h2 className="text-5xl">No Activity Yet...</h2>
				<button
					onClick={() =>
						(
							document.getElementById(
								"transfer_modal",
							) as HTMLDialogElement
						).showModal()
					}
					className="hover:underline underline-offset-8 text-primary"
				>
					Click here to make your first transfer
				</button>
			</div>
		);

	return (
		<div className="h-full w-full">
			{isMobile(windowSize) ? <>
				<div className="flex flex-row justify-center py-3">
					<h1 className="text-2xl font-bold">Activity</h1>
				</div>
				{data?.activity.map((activity: Activity) => (
					<ActivityCard
						key={activity.date}
						date={activity.date}
						type={activity.type}
						description={activity.description}
						amount={activity.amount}
					/>
				))}
			</>

				: (
					<Table
						loading={loading}
						error={error}
						data={data?.activity}
						columnData={cols}
						enableRowActions={false}
						sorting={[{ id: "date", desc: true }]}
					/>
				)}
		</div>
	);
}
