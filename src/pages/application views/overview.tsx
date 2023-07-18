import DataContainer from "../../components/container/dataContainer";
import PieChart from "../../components/data/pieChart";
import { formatDollars } from "../../utilities/currency";

export default function Overview() {
	const mockData = {
		cash: 25000,
		investmentTotal: 2500000,
	};

	return (
		<div className="p-3 flex flex-col gap-3">
			<DataContainer className="font-semibold px-3 flex flex-row justify-left gap-20">
				<DataComponent
					title="Net Worth"
					cents={mockData.cash + mockData.investmentTotal}
				/>
				<DataComponent title="Investments" cents={mockData.investmentTotal} />
				<DataComponent title="Cash" cents={mockData.cash} />
			</DataContainer>
			<DataContainer className="h-full max-w-[50%] p-3 flex flex-row justify-around">
				<PieChart />
			</DataContainer>
		</div>
	);
}

interface DataComponentProps {
	title: string;
	cents: number;
}

const DataComponent = ({ title, cents }: DataComponentProps) => {
	return (
		<div className="flex flex-col">
			<p>{title}</p>
			<p className="text-lg">{formatDollars(cents)}</p>
		</div>
	);
};
