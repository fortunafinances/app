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
import { useState } from 'react';
import { GET_LINE_CHART_STOCK_HISTORIAL, GET_LINE_CHART_USER } from '../../utilities/graphQL';
import { useQuery, useReactiveVar } from "@apollo/client";
import { currentAccountId } from '../../utilities/reactiveVariables';

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

type LineSPData = {
    stockHistorical: {
        data: DataPoint[];
    }
}

type LineUser = {
    accountHistorical: {
        data: DataPoint;
    }
}

export function LineChart() {
    // get SP 500 query
    const { loading: spLoading, error: spError, data: sp } = useQuery<LineSPData>(GET_LINE_CHART_STOCK_HISTORIAL, {
        variables: { ticker: "^GSPC" },
    });

    // get user query
    const currentAccountNumber = useReactiveVar(currentAccountId);
    const { loading: userLoading, error: userError, data: user } = useQuery<LineUser>(GET_LINE_CHART_USER, {
        variables: { accId: 1 },
    });

    // get date and price from query    
    const spData = sp?.stockHistorical.data;
    const userData = user?.accountHistorical.data;

    const [range, setRange] = useState([]);



    if (spLoading || userLoading) {
        return (
            <div>
                <span className="loading loading-ball loading-xs"></span>
                <span className="loading loading-ball loading-sm"></span>
                <span className="loading loading-ball loading-md"></span>
                <span className="loading loading-ball loading-lg"></span>
            </div>
        )
    };
    if (spError || userError) return <p>Error : hihi</p>;
    if (
        sp?.stockHistorical.data.length === undefined ||
        sp?.stockHistorical.data.length < 1
    )
        return <p>No data to display</p>;

    // initialize the chart
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    usePointStyle: true,
                },
            },
            title: {
                display: true,
                text: 'Performance',
                font: {
                    size: 25,
                    fontColor: '#000000',
                }
            },
        },
        scales: {
            x: {
                type: 'time' as const,
                time: {
                    unit: 'day' as const,
                    displayFormats: {
                        day: 'MMM yy'
                    }
                }
            },

            y: {
                ticks: {
                    callback: function (value: number, index: number, values: number[]) {
                        console.log(values) // currently undefined!!
                        // Convert the money value into a percentage
                        // const percentage = ((value - values[0]) / values[0]) * 100;

                        // Format the percentage with 2 decimal places
                        // return `${percentage.toFixed(2)}%`;

                        return value + '%';
                    },
                }
            },
        },
    };

    console.log(range);

    const chartData = {
        labels: range,
        datasets: [
            {
                label: "Brokerage Account",
                data: userData,
                pointStyle: 'rect',
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "S&P 500",
                data: spData,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };

    return (
        <div className='w-full' >
            <Line options={chartOptions} data={chartData} />
            <div className="flex mt-5 justify-center">
                {/* 3 months */}
                <button
                    onClick={() => {
                        // const newRange = getMostRecentMonths(dateLabels!, 3);
                        // console.log(newRange);
                        // setRange(newRange);
                    }}
                    className="w-full flex-1 btn text-primary bg-[#EDEDFE] min-h-[2rem] h-[1rem] mr-3">3 Months
                </button>

                {/* 6 months */}
                <button
                    onClick={() => {
                        // const newRange = getMostRecentMonths(dateLabels!, 6);
                        // setRange(newRange);
                    }}
                    className="w-full flex-1 btn text-primary bg-[#EDEDFE] min-h-[2rem] h-[1rem] mr-3">6 Months
                </button>

                {/* 12 months */}
                <button
                    onClick={() => {
                        // const newRange = getMostRecentMonths(dateLabels!, 12);
                        // setRange(newRange);
                    }}
                    className="w-full flex-1 btn text-primary bg-[#EDEDFE] min-h-[2rem] h-[1rem] mr-3">12 Months
                </button>
            </div>
        </div >
    );
}