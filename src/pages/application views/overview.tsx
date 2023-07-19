import { gql, useQuery } from "@apollo/client";
import DataContainer from "../../components/container/dataContainer";
import PieChart from "../../components/data/pieChart";
import { formatDollars } from "../../utilities/currency";

const GET_OVERVIEW = gql`
	query DisplayBar {
		displayBar(input: { accId: 1 }) {
			total
			invest
			cash
		}
	}
`;

type DisplayBar = {
	displayBar: {
		total: number;
		invest: number;
		cash: number;
	};
};

export default function Overview() {
	const { loading, error, data } = useQuery<DisplayBar>(GET_OVERVIEW);

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
			<DataContainer className="h-full max-w-[50%] p-3 flex flex-row justify-around">
				<PieChart />
			</DataContainer>
		</div>
	);
}
