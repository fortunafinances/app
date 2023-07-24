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
import { lineChartDateRange } from '../../utilities/reactiveVariables';
import { useReactiveVar } from "@apollo/client/react/hooks/useReactiveVar";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export function LineChart() {
    const chart = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Line Chart',
            },
        },
    };

    // initalize date range
    lineChartDateRange([
        {
            full: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ],
            half: ["January", "February", "March", "April", "May", "June"],
            quarter: ["January", "February", "March"]
        }
    ]);

    const range = useReactiveVar(lineChartDateRange);

    const data = {
        labels: range[0].full,
        datasets: [
            {
                label: "Dataset 1",
                data: [12, 19, 3, 5, 2, 3, 9, 20, 100, 35, 25, 15],
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Dataset 2",
                data: [5, 10, 15, 20, 25, 30, 35, 60, 28, 13, 55, 12],
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };

    // chart.labels = range[0].full;

    return <Line options={chart} data={data} />;

}
