import { gql, useQuery, useReactiveVar } from "@apollo/client";
import DataContainer from "../../components/container/dataContainer";
import PieChart from "../../components/data/pieChart";
import { LineChart } from "../../components/data/lineChart";
import { formatDollars } from "../../utilities/currency";
import { currentAccountId } from "../../utilities/reactiveVariables";

type DisplayBar = {
	displayBar: {
		total: number;
		invest: number;
		cash: number;
	};
};

export default function Overview() {
	const accountId = useReactiveVar(currentAccountId);

	const GET_OVERVIEW = gql`
		query DisplayBar($accId: Int!) {
			displayBar(input: { accId: $accId }) {
				total
				invest
				cash
			}
		}
	`;

	const { loading, error, data } = useQuery<DisplayBar>(GET_OVERVIEW, {
		variables: { accId: accountId },
	});

	type DataComponentProps = {
		title: string;
		dollars: number;
	};

	const DataComponent = ({ title, dollars }: DataComponentProps) => (
		<div className="flex flex-col">
			<p>{title}</p>
			{loading ? (
				<span className="loading loading-dots loading-md" />
			) : error ? (
				<p>Error accessing backend</p>
			) : (
				<p className="text-lg">{formatDollars(dollars)}</p>
			)}
		</div>
	);

	return (
		<div className="p-3 flex flex-col gap-3">
			<DataContainer className="font-semibold px-3 flex flex-row md:justify-start justify-between md:gap-20">
				<DataComponent
					title="Net Worth"
					dollars={data?.displayBar.total ?? 0}
				/>
				<DataComponent
					title="Investments"
					dollars={data?.displayBar.invest ?? 0}
				/>
				<DataComponent title="Cash" dollars={data?.displayBar.cash ?? 0} />
			</DataContainer>
			<div style={{ display: "flex", flexDirection: "row" }}>
				<DataContainer className="h-full md:max-w-[50%] max-w-full p-3 flex flex-row justify-around" >
					<PieChart />
				</DataContainer>
				<DataContainer className="h-full md:max-w-[50%] max-w-full p-3 flex flex-row justify-around">
					<LineChart />
				</DataContainer>
			</div>

		</div>
	);
}
