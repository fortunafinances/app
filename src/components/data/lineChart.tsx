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
    const range = useReactiveVar(lineChartDateRange)
    const rangeLable = range[0].full;
    console.log("range", rangeLable)


    const data = {
        labels: rangeLable,
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

    return (
        <div>
            <Line options={chart} data={data} />
            <div className="inline-flex">
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold border border-gray-400 py-2 px-4 rounded-l">
                    3 Months
                </button>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold border border-gray-400 py-2 px-4">
                    6 Months
                </button>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold border border-gray-400 py-2 px-4 rounded-r">
                    12 Months
                </button>
            </div>
        </div>
    );

}
