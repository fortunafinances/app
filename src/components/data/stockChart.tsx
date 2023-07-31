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

export function StockChart(props : StockChartProps) {
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

    // get SP500 date and price from query
    const dateLabels = lineData?.stockHistorical.date;
    const priceData = lineData?.stockHistorical.price;
    // console.log("print dateLabels: ", dateLabels);
    // console.log("print price: ", spPrice);
    // console.log("print range: ", range);
    // initialize the chart
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: '???',
                font: {
                    size: 25,
                    fontColor: '#000000',
                }
            },

        },
    };

    const chartData = {
        labels: dateLabels,
        datasets: [
            {
                label: "Brokerage Account",
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