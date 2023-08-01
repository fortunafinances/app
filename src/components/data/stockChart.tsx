import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import "chartjs-adapter-date-fns";
import { GET_LINE_CHART_STOCK_HISTORIAL } from '../../utilities/graphQL';
import { useQuery } from "@apollo/client";
import { getLabelForValue, getMonthName } from '../../utilities/common';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    TimeScale,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
);

type DataPoint = {
    x: string;
    y: number;
}

type LineStock = {
    stockHistorical: {
        data: DataPoint[];
    }
}

interface StockChartProps {
    stockName: string;
}

export function StockChart(props: StockChartProps) {
    const { loading: lineLoading, error: lineError, data: lineData } = useQuery<LineStock>(GET_LINE_CHART_STOCK_HISTORIAL, {
        variables: { ticker: props.stockName },
    });

    if (lineLoading)
        return (
            <div>
                <span className="loading loading-ball loading-xs"></span>
                <span className="loading loading-ball loading-sm"></span>
                <span className="loading loading-ball loading-md"></span>
                <span className="loading loading-ball loading-lg"></span>
            </div>
        );
    if (lineError) {
        return <div>{lineError?.message}</div>;
    }

    // get date and price from query
    const stockData = lineData?.stockHistorical.data;
    const firstDate = stockData[0].x;
    console.log(firstDate);

    // initialize the chart
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                display: false,
            },
            title: {
                display: false,
                text: 'Stock History',
            },

        },
        scales: {
           x: {
				type: 'time' as const,
				time: {
					unit: 'day' as const,
					displayFormats: {
						day: 'd/MM/yyyy'
					},
				},
                min: firstDate,
			},
            y: {
                ticks: {
                    callback: function (value: number) {
                        return '$' + value; // add money symbol
                    },
                }
            },
        }
    };

    const chartData = {
        labels: "Default Data",
        datasets: [
            {
                label: 'Price',
                data: stockData,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    return (
        <div>
            <Line options={chartOptions} data={chartData} />
        </div >
    );
}