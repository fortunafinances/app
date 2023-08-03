import { useQuery, useReactiveVar } from "@apollo/client";
import DataContainer from "../../components/container/dataContainer";
import PieChart from "../../components/data/pieChart";
import { LineChart } from "../../components/data/overviewChart";
import { formatDollars } from "../../utilities/common";
import {
	currentAccountId,
	sidebarClosed,
} from "../../utilities/reactiveVariables";
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

	const sidebar = useReactiveVar(sidebarClosed);

	const { loading, error, data } = useQuery<DisplayBar>(GET_OVERVIEW, {
		variables: { accId: accountId ? accountId : 0 },
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

	if (!sidebar && window.screen.width <= 768) return <></>;

	const DataComponent = ({ title, dollars }: DataComponentProps) => (
		<div className="flex flex-col text-center">
			<p>{title}</p>
			{loading ? (
				<span className="loading loading-dots loading-md" />
			) : error ? (
				<p>Error accessing backend</p>
			) : (
				<p className="text-md md:text-lg">{formatDollars(dollars)}</p>
			)}
		</div>
	);

	return (
		<div className="p-3 flex flex-col gap-3 h-full">
			<DataContainer className="font-semibold px-3 flex flex-row md:justify-start justify-between md:gap-20 border-2 border-primary">
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
				<div className="flex flex-col md:flex-row h-full justify-between [&>*]:border-2 [&>*]:border-primary">
					<DataContainer className="h-fit xl:h-full md:max-w-[49.5%] max-w-full flex flex-col justify-center items-center p-6 ">
						<h2 className="text-3xl">Portfolio Sector Breakdown</h2>
						<PieChart />
					</DataContainer>
					<DataContainer className="h-full max-h-[40rem]:h-fit md:max-w-[49.5%] max-w-full flex flex-col justify-center items-center">
						<h2 className="text-2xl">
							Historical Account Performance
						</h2>
						<LineChart />
					</DataContainer>
				</div>
			)}
		</div>
	);
}
