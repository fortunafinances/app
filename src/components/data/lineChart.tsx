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
	Filler
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import "chartjs-adapter-date-fns";
import { subtractMonths } from '../../utilities/common';
import { useState } from 'react';
import { GET_LINE_CHART } from '../../utilities/graphQL';
import { useQuery, useReactiveVar } from "@apollo/client";
import { currentAccountId } from '../../utilities/reactiveVariables';
import { twMerge } from 'tailwind-merge';

ChartJS.register(
	Title,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	TimeScale,
	Filler
);

type LineData = {
	stockHistorical: {
		data: {
			x: string;
			y: number;
		}[];
	},
	accountHistorical: {
		data: {
			x: string;
			y: number;
		}[]
	}
}

const dateOptions = [{ value: 0.7, label: "1 Week" }, { value: 1, label: "1 Month" }, { value: 3, label: "3 Months" }, { value: 6, label: "6 Months" }, { value: 12, label: "1 Year" }]

export function LineChart() {
	// get historical data
	const currentAccount = useReactiveVar(currentAccountId);
	const { loading, error, data } = useQuery<LineData>(GET_LINE_CHART, { variables: { accId: currentAccount } });


	function convertToRoundedPercentageChange(dataPoints: { x: string; y: number }[]) {
		const firstPrice = dataPoints[0].y;
		const roundedPercentageChanges: { x: string; y: number }[] = [];

		for (let i = 0; i < dataPoints.length; i++) {
			const percentageChange = ((dataPoints[i].y - firstPrice) / firstPrice) * 100;
			const roundedPercentageChange = Number(percentageChange.toFixed(2));
			roundedPercentageChanges.push({ x: dataPoints[i].x, y: roundedPercentageChange });
		}

		return roundedPercentageChanges;
	}

	const [range, setRange] = useState<number>(3);

	if (loading) {
		return (
			<span className="loading loading-ball loading-md"></span>
		)
	};

	if (error) { return <p>Error: {error.message}</p>; }

	const options = {
		type: "scatter",
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: false,
			},
		},
		scales: {
			x: {
				type: 'time' as const,
				time: {
					unit: 'day' as const,
					displayFormats: {
						day: "MMM d, yyyy"
					}
				},
				ticks: {
					maxTicksLimit: 5,
				},
				min: subtractMonths(new Date(), range).toISOString(),
			},
		}
	}


	const chartDataSets = [{
		label: "S&P 500",
		data:
			convertToRoundedPercentageChange(data!.stockHistorical.data),
		showLine: true,
		lineTension: 0.5,
		borderColor: 'rgb(100, 100, 255)',
		pointRadius: 5,
		pointHoverRadius: 7

	}, {
			label: "Account History",
			data:
				convertToRoundedPercentageChange(data!.accountHistorical.data),
			showLine: true,
			lineTension: 0.2,
			borderColor: 'rgb(10, 150, 20)',
			pointStyle: "rectRot",
			pointRadius: 5,
			pointHoverRadius: 7
		}
	];

	return (
		<div className='w-full' >
			<Scatter options={options} data={{ datasets: chartDataSets }} />
			<div className="flex flex-col md:flex-row gap-1 mt-5 justify-center">
				{dateOptions.map((item) => {
					return <button
						onClick={() => {
							setRange(item.value);
						}}
						className={twMerge("w-full flex-1 btn text-primary bg-[#EDEDFE]", range === item.value && "bg-[#989898]")}>{item.label}
					</button>
				})}

			</div>
		</div >
	);
}