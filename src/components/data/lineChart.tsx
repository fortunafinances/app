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
    const dateLables = [
        '2021-09-06',
        '2021-09-13',
        '2021-09-20',
        '2021-09-27',
        '2021-10-04',
        '2021-10-11',
        '2021-10-18',
        '2021-10-25',
        '2021-11-01',
        '2021-11-08',
        '2021-11-15',
        '2021-11-22'
    ]

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
                data: [50, 60, 20, 50, 60, 20, 100, 5, 40, 80, 55, 25, 15, 20],
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "S&P 500",
                data: [100, 25, 40, 80, 55, 25, 50, 60, 20, 100, 25, 40, 80],
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],

    };

    // change the format from full format to just showing months
    const formattedLabels = chartData.labels.map((label) =>
        // passed date into moment and have it format the expected format for us
        moment(label).format('MMM')
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

    // put the new date format + gap into lables of chartData
    const modifiedChartData = {
        ...chartData,
        labels: newLables,
    };

    return (
        <div className='w-full' >
            <Line options={chartOptions} data={modifiedChartData} />
            <div className="flex mt-5 justify-center">
                {/* 6 months */}
                <button
                    onClick={() => lineChartDateRange(dateRanges.half)}
                    className="focus:bg-gray-600 focus:text-gray-50 flex-1 px-5 py-2.5 relative group overflow-hidden font-medium bg-gray-50 text-gray-600 border  border-gray-400 inline-block">
                    <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-gray-600 group-hover:h-full opacity-90"></span>
                    <span className="relative group-hover:text-white">6 Months</span>
                </button>
                {/* 12 months */}
                <button
                    onClick={() => lineChartDateRange(dateRanges.full)}
                    className="focus:bg-gray-600 focus:text-gray-50 flex-1 px-5 py-2.5 relative group overflow-hidden font-medium bg-gray-50 text-gray-600 border  border-gray-400 inline-block rounded-r">
                    <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-gray-600 group-hover:h-full opacity-90"></span>
                    <span className="relative group-hover:text-white">12 Months</span>
                </button>
                {/* 24 months */}
                <button
                    onClick={() => lineChartDateRange(dateRanges.two)}
                    className="focus:bg-gray-600 focus:text-gray-50 flex-1 px-5 py-2.5 relative group overflow-hidden font-medium bg-gray-50 text-gray-600 border  border-gray-400 inline-block rounded-l">
                    <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-gray-600 group-hover:h-full opacity-90"></span>
                    <span className="relative group-hover:text-white">24 Months</span>
                </button>
            </div>
        </div >
    );

}