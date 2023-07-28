import { useQuery, useReactiveVar } from "@apollo/client";
import DataContainer from "../../components/container/dataContainer";
import PieChart from "../../components/data/pieChart";
import { LineChart } from "../../components/data/lineChart";
import { formatDollars } from "../../utilities/currency";
import { currentAccountId } from "../../utilities/reactiveVariables";
import { GET_HOLDINGS, GET_OVERVIEW } from "../../utilities/graphQL";
import { Holding, GraphQLReturnData } from "../../utilities/types";
import NoInvestments from "../../components/data/noInvestments";

type DisplayBar = {
	displayBar: {
		total: number;
		invest: number;
		cash: number;
	};
};

export default function Overview() {
	const accountId = useReactiveVar(currentAccountId);

	const { loading, error, data } = useQuery<DisplayBar>(GET_OVERVIEW, {
		variables: { accId: accountId },
	});

	type DataComponentProps = {
		title: string;
		dollars: number;
	};

	interface HoldingsQuery {
		holdings: Holding[] & GraphQLReturnData;
	}

	const {
		loading: holdingsLoading,
		error: holdingsError,
		data: holdingsData,
	} = useQuery<HoldingsQuery>(GET_HOLDINGS, {
		variables: { accId: accountId },
	});

	if (holdingsLoading)
		return (
			<div className="h-full w-full flex flex-row justify-center items-center">
				<span className="loading loading-infinity loading-lg" />
			</div>
		);
	if (holdingsError)
		return (
			<div className="h-full w-full flex flex-row justify-center items-center text-red-600 text-5xl">
				<p>Error</p>
			</div>
		);

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
		<div className="p-3 flex flex-col gap-3 h-full">
			<DataContainer className="font-semibold px-3 flex flex-row md:justify-start justify-between md:gap-20">
				<DataComponent
					title="Net Worth"
					dollars={data?.displayBar.total ?? 0}
				/>
				<DataComponent
					title="Investments"
					dollars={data?.displayBar.invest ?? 0}
				/>
				<DataComponent
					title="Cash"
					dollars={data?.displayBar.cash ?? 0}
				/>
			</DataContainer>
			{holdingsData?.holdings.length === 0 ? (
				<NoInvestments />
			) : (
				<div className="flex h-full">
					<DataContainer className="h-full md:max-w-[50%] max-w-full p-3 flex flex-col justify-around items-center mr-1">
						<h2 className="text-2xl">Portfolio Sector Breakdown</h2>
						<PieChart />
					</DataContainer>
					<DataContainer className="h-full md:max-w-[50%] max-w-full p-3 flex flex-col justify-center ml-1">
						<LineChart />
					</DataContainer>
				</div>
			)}
		</div>
	);
}
