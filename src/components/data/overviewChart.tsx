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
	Filler,
	TooltipItem,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import {
	convertToRoundedPercentageChange,
	dateOptions,
	subtractMonths,
} from "../../utilities/common";
import { useState } from "react";
import { GET_OVERVIEW_LINE_CHART } from "../../utilities/graphQL";
import { useQuery, useReactiveVar } from "@apollo/client";
import { currentAccountId } from "../../utilities/reactiveVariables";
import { twMerge } from "tailwind-merge";
import { DataPoint } from "../../utilities/types";
import { format } from "date-fns";

ChartJS.register(
	Title,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	TimeScale,
	Filler,
);

type LineData = {
	stockHistorical: {
		data: DataPoint[];
	};
	accountHistorical: {
		data: DataPoint[];
	};
};

export function LineChart() {
	const date = new Date();
	// get historical data
	const currentAccount = useReactiveVar(currentAccountId);
	const { loading, error, data } = useQuery<LineData>(
		GET_OVERVIEW_LINE_CHART,
		{ variables: { accId: currentAccount } },
	);
	const [range, setRange] = useState<number>(3);

	if (loading) {
		return <span className="loading loading-ball loading-md"></span>;
	}

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	// initialize the chart
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "top" as const,
				labels: {
					usePointStyle: true,
				},
			},
			title: {
				display: false,
			},
			tooltip: {
				callbacks: {
					label: (t: TooltipItem<"scatter">) => {
						const rawData = t.raw as DataPoint;
						const date = new Date(String(rawData.x));
						return [
							format(date, "eee MMM dd, yyyy"),
							rawData.y + "%",
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
				ticks: {
					maxTicksLimit: 5,
				},
				min:
					range === 0
						? new Date(date.getFullYear(), 0, 1).toISOString()
						: subtractMonths(date, range).toISOString(),
				max: date.toISOString(),
			},
			y: {
				ticks: {
					callback: (value: number | string) => value + "%",
					maxTicksLimit: 10,
				},
			},
		},
	};

	const chartDataSets = [
		{
			label: "S&P 500",
			data: convertToRoundedPercentageChange(data!.stockHistorical.data),
			showLine: true,
			lineTension: 0.2,
			borderColor: "rgb(100, 100, 255)",
			pointRadius: 5,
			pointHoverRadius: 7,
		},
		{
			label: "Account History",
			data: convertToRoundedPercentageChange(
				data!.accountHistorical.data,
			),
			showLine: true,
			lineTension: 0.2,
			borderColor: "rgb(10, 150, 20)",
			pointStyle: "triangle",
			pointRadius: 5,
			pointHoverRadius: 7,
		},
	];

	return (
		<div className="w-full h-fit">
			<div className="min-h-[250px]">
				<Scatter options={options} data={{ datasets: chartDataSets }} />
			</div>
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-1 mt-5 justify-center rounded-md">
				{dateOptions.map((item, i) => {
					return (
						<button
							key={i}
							onClick={() => {
								setRange(item.value);
							}}
							className={twMerge(
								"w-full btn text-primary hover:border-2 hover:border-primary hover:bg-white bg-white",
								range === item.value &&
									"border-4 border-primary",
							)}
						>
							{item.label}
						</button>
					);
				})}
			</div>
		</div>
	);
}
