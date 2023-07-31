import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { GET_LINE_CHART_STOCK_HISTORIAL } from '../../utilities/graphQL';
import { useQuery } from "@apollo/client";
import { getLabelForValue, getMonthName } from '../../utilities/common';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
);

type LineStock = {
    stockHistorical: {
        date: string[];
        price: number[];
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
    const dateLabels = lineData?.stockHistorical.date;
    const priceData = lineData?.stockHistorical.price;

    // initialize the chart
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Stock History',
                font: {
                    size: 25,
                    fontColor: '#000000',
                }
            },

        },
        scales: {
            x: {
                ticks: {
                    callback: (value: number) => {
                        const currentLabel = getLabelForValue(value, dateLabels!);
                        const [year, month, day] = currentLabel.split('-');
                        const formattedLabel = `${day} ${getMonthName(month)} - ${year.slice(2)}`;
                        return formattedLabel;
                    },
                },
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
        labels: dateLabels,
        datasets: [
            {
                label: 'Price',
                data: priceData,
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