import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	TimeScale,
	TooltipItem,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { GET_STOCK_LINE_CHART } from "../../utilities/graphQL";
import { useQuery } from "@apollo/client";
import { DataPoint } from "../../utilities/types";
import { formatDollars } from "../../utilities/common";
import format from "date-fns/format";

ChartJS.register(
	Title,
	Tooltip,
	Legend,
	TimeScale,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
);

type LineStock = {
	stockHistorical: {
		data: DataPoint[];
	};
};

interface StockChartProps {
	stockName: string;
}

export function StockChart(props: StockChartProps) {
	const {
		loading: lineLoading,
		error: lineError,
		data: lineData,
	} = useQuery<LineStock>(GET_STOCK_LINE_CHART, {
		variables: { ticker: props.stockName },
	});

	if (lineLoading)
		return (
			<div>
				<span className="loading loading-ball loading-lg"></span>
			</div>
		);
	if (lineError) {
		return <div>{lineError?.message}</div>;
	}

	// get date and price from query
	const stockData = lineData?.stockHistorical.data;
	const firstDate = stockData![0].x;

	// initialize the chart
	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "top" as const,
				display: false,
			},
			title: {
				display: false,
				text: "Stock History",
			},
			tooltip: {
				callbacks: {
					label: (t: TooltipItem<"scatter">) => {
						const rawData = t.raw as DataPoint;
						const date = new Date(String(rawData.x));
						return [
							format(date, "eee MMM dd, yyyy"),
							formatDollars(rawData.y),
						];
					},
				},
			},
		},
		scales: {
			x: {
				type: "time" as const,
				time: {
					unit: "day" as const,
					displayFormats: {
						day: "MMM d, yyyy",
					},
				},
				min: firstDate,
				ticks: {
					maxTicksLimit: 6,
				},
			},
			y: {
				type: "linear" as const,
				ticks: {
					callback: (value: string | number) =>
						formatDollars(Number(value)),
				},
			},
		},
	};

	const chartData = {
		labels: ["Default Data"],
		datasets: [
			{
				label: "Price",
				data: stockData,
				borderColor: "rgb(255, 99, 132)",
				showLine: true,
				lineTension: 0.2,
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
		],
	};

	return (
		<div className="w-full min-h-[300px]">
			<Scatter options={chartOptions} data={chartData} />
		</div>
	);
}