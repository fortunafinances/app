import { gql, useQuery } from "@apollo/client";
import Table from "../../components/data/table";
import { useMemo } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { Activity } from "../../utilities/types";
import { filterRange, formatCentsToDollars } from "../../utilities/currency";

export default function Activity() {
	const cols = useMemo<MRT_ColumnDef<Activity>[]>(
		() => [
			{
				header: "Date",
				accessorKey: "date",
			},
			{
				header: "Type",
				accessorKey: "type",
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
				accessorFn: (row) => `${formatCentsToDollars(row.amount)}`,
				sortingFn: (a, b) => {
					return a.original.amount - b.original.amount;
				},
				filterFn: (row, _columnIds, filterValue: number[]) =>
					filterRange(row.original.amount, _columnIds, filterValue),
			},
		],
		[]
	);

	type ActivitiesQuery = {
		activity: Activity[];
	};

	const GET_ACTIVITIES = gql`
		query Activity {
			activity(input: { accId: 1 }) {
				date
				type
				description
				amount
			}
		}
	`;

	const { loading, error, data } = useQuery<ActivitiesQuery>(GET_ACTIVITIES);

	return (
		<div className="h-full w-full overflow-y-clip">
			<Table
				loading={loading}
				error={error}
				data={data?.activity ?? []}
				columnData={cols}
			/>
		</div>
	);
}
