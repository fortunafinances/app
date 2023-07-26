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
				label: "# of Votes",
				data: remoteData?.pieData.values,
				backgroundColor: [
					"rgba(255, 99, 132, 0.8)",
					"rgba(54, 162, 235, 0.8)",
					"rgba(255, 206, 86, 0.8)",
					"rgba(75, 192, 192, 0.8)",
					"rgba(153, 102, 255, 0.8)",
					"rgba(255, 159, 64, 0.8)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;
	if (
		remoteData?.pieData.values.length === undefined ||
		remoteData?.pieData.values.length < 1
	)
		return <p>No data to display</p>;

	console.log(remoteData?.pieData);

	return <Doughnut data={data} />;
}
