import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useQuery, useReactiveVar } from "@apollo/client";
import { currentAccountId } from "../../utilities/reactiveVariables";
import { GET_PIE_CHART_DATA } from "../../utilities/graphQL";

Chart.register([ArcElement, Tooltip, Legend]);

type PieData = {
	pieData: {
		labels: string[];
		values: number[];
	};
};

interface PieChartContext {
	label: string;
	parsed: number;
	dataset: {
		data: number[];
	};
}

export default function PieChart() {
	const currentAccountNumber = useReactiveVar(currentAccountId);
	const {
		loading,
		error,
		data: remoteData,
	} = useQuery<PieData>(GET_PIE_CHART_DATA, {
		variables: { accId: currentAccountNumber },
	});

	const data = {
		labels: remoteData?.pieData.labels,
		datasets: [
			{
				label: "% of Portfolio",
				data: remoteData?.pieData.values,
				backgroundColor: [
					"rgba(255, 99, 132, 0.8)",
					"rgba(54, 162, 235, 0.8)",
					"#FFE299",
					"rgba(75, 192, 192, 0.8)",
					"rgba(153, 102, 255, 0.8)",
					"#FFA347",
				],
				borderColor: [
					"rgba(255, 99, 132, 0.8)",
					"rgba(54, 162, 235, 0.8)",
					"#FFE299",
					"rgba(75, 192, 192, 0.8)",
					"rgba(153, 102, 255, 0.8)",
					"#FFA347",
				],
				borderWidth: 1,
			},
		],
	};

	const options = {
		plugins: {
			tooltip: {
				callbacks: {
					label: (context: PieChartContext) => {
						const sum = context.dataset.data.reduce(
							(a: number, total: number) => total + a,
						);
						const formatter = new Intl.NumberFormat("en-US", {
							minimumFractionDigits: 0,
							maximumFractionDigits: 2,
						});
						return `${formatter.format(
							(Number(context.parsed) / sum) * 100,
						)}%`;
					},
				},
			},
		},
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;
	if (
		remoteData?.pieData.values.length === undefined ||
		remoteData?.pieData.values.length < 1
	)
		return <p>No data to display</p>;

	return <Doughnut data={data} options={options} />;
}
