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
import moment from 'moment';
import { dateRanges, lineChartDateRange } from '../../utilities/reactiveVariables';
import { useReactiveVar } from "@apollo/client/react/hooks/useReactiveVar";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
);


export function LineChart() {
    const dateLables = ['2021-09-06', '2021-09-13', '2021-09-20', '2021-09-27', '2021-10-04', '2021-10-11', '2021-10-18', '2021-10-25', '2021-11-01', '2021-11-08', '2021-11-15', '2021-11-22', '2021-12-29', '2021-12-7', '2021-12-20', '2021-12-27', '2022-10-04', '2022-10-11', '2022-10-18', '2022-10-25', '2022-11-01', '2022-11-08', '2022-11-15', '2022-11-22',
        '2023-09-06', '2023-09-13', '2023-09-20', '2023-09-27', '2023-10-04', '2023-10-11', '2023-10-18', '2023-10-25', '2023-11-01', '2023-11-08', '2023-11-15', '2023-11-22', '2023-12-29', '2023-12-7', '2023-12-20', '2023-12-27', '2024-10-04', '2024-10-11', '2024-10-18', '2024-10-25', '2024-11-01', '2024-11-08', '2024-11-15', '2024-11-22']

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Line Chart',
            },
            x: {
                type: 'time',
                time: {
                    displayFormats: {
                        month: 'MMM',
                    },
                },
                ticks: {
                    source: 'auto',
                },
            },
        },
    };

    const range = useReactiveVar(lineChartDateRange)

    const chartData = {
        labels: dateLables,
        datasets: [
            {
                label: "Brokerage Account",
                data: [50, 60, 20, 50, 60, 20, 100, 5, 40, 80, 55, 25, 15, 20,
                    80, 55, 25, 50, 60, 20, 100, 25, 0, 50, 60, 20, 50, 60, 20, 100, 5, 40, 80, 55, 25, 15, 20,
                    80, 55, 25, 50, 60, 20, 100,],
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "S&P 500",
                data: [100, 25, 40, 80, 55, 25, 50, 60, 20, 100, 25, 40, 80,
                    20, 50, 60, 20, 100, 5, 40, 80, 50, 60, 20, 50, 60, 20, 100, 5, 40, 80, 55, 25, 15, 20,
                    80, 55, 25, 50, 60, 20, 100, 25,],
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],

    };

    // change the format from full format to just showing months
    const formattedLabels = chartData.labels.map((label) =>
        // passed date into moment and have it format the expected format for us
        moment(label).format('MMM YY')
    );

    // function to create the gap in lables
    function labelGap(labels: string[]) {
        const uniqueLabels = [];
        // create a set to keep track of which month we add already
        const set = new Set();
        for (let label of labels) {
            // if set doens't have lable, add it to array and set
            if (!set.has(label)) {
                uniqueLabels.push(label);
                set.add(label);
            } else {
                // added empty string to lable
                uniqueLabels.push("");
            }
        }
        return uniqueLabels;
    }

    // get new lables array to pass in chart
    const newLables = labelGap(formattedLabels);
    console.log(newLables)

    // put the new date format + gap into lables of chartData
    const modifiedChartData = {
        ...chartData,
        labels: newLables,
    };

    return (
        <div className='w-full' >
            <Line options={chartOptions} data={modifiedChartData} />
            <div className="flex mt-5 justify-center">
                {/* 3 months */}
                <button className="w-full flex-1 btn text-primary bg-[#EDEDFE] min-h-[2rem] h-[1rem] mr-3">3 Months</button>
                {/* 6 months */}
                <button className="w-full flex-1 btn text-primary bg-[#EDEDFE] min-h-[2rem] h-[1rem] mr-3">6 Months</button>
                {/* 12 months */}
                <button className="w-full flex-1 btn text-primary bg-[#EDEDFE] min-h-[2rem] h-[1rem] mr-3">12 Months</button>

            </div>
        </div >
    );

}