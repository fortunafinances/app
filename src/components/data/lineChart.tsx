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
import { getMostRecentMonths } from '../../utilities/common';
import { useState } from 'react';
import { GET_LINE_CHART_SP500, GET_LINE_CHART_USER } from '../../utilities/graphQL';
import { useQuery, useReactiveVar } from "@apollo/client";
import { currentAccountId } from '../../utilities/reactiveVariables';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
);

type LineSPData = {
    stockHistorical: {
        date: string[];
        price: number[];
    }
}

type LineUser = {
    accountHistorical: {
        date: string[];
        value: number[];
    }
}

export function LineChart() {
    // get SP 500 query
    const { loading: spLoading, error: spError, data: spData } = useQuery<LineSPData>(GET_LINE_CHART_SP500, {
        variables: { ticker: "^GSPC" },
    });

    // get user query
    const currentAccountNumber = useReactiveVar(currentAccountId);
    const { loading: userLoading, error: userError, data: userData } = useQuery<LineUser>(GET_LINE_CHART_USER, {
        variables: { accId: 1 },
    });


    // get SP500 date and price from query
    const dateLables = spData?.stockHistorical.date;
    const spPrice = spData?.stockHistorical.price;
    // console.log(dateLables);

    const userPrice = userData?.accountHistorical.value;
    const [range, setRange] = useState(dateLables);

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
    if (spError || userError) return <p>Error :</p>;
    if (
        spData?.stockHistorical.date.length === undefined ||
        spData?.stockHistorical.date.length < 1
    )
        return <p>No data to display</p>;

    console.log(spData?.stockHistorical.date);

    // initialize the chart
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

    const chartData = {
        labels: range,
        datasets: [
            {
                label: "Brokerage Account",
                data: userPrice,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "S&P 500",
                data: spPrice,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],

    };

    // change the format from full format to just showing months
    const formattedLabels = chartData.labels?.map((label) =>
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
    const newLables = labelGap(formattedLabels!);

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
                <button
                    onClick={() => {
                        const newRange = getMostRecentMonths(dateLables!, 3);
                        setRange(newRange);
                    }}
                    className="w-full flex-1 btn text-primary bg-[#EDEDFE] min-h-[2rem] h-[1rem] mr-3">3 Months
                </button>

                {/* 6 months */}
                <button
                    onClick={() => {
                        const newRange = getMostRecentMonths(dateLables!, 6);
                        setRange(newRange);
                    }}
                    className="w-full flex-1 btn text-primary bg-[#EDEDFE] min-h-[2rem] h-[1rem] mr-3">6 Months
                </button>

                {/* 12 months */}
                <button
                    onClick={() => {
                        const newRange = getMostRecentMonths(dateLables!, 12);
                        setRange(newRange);
                    }}
                    className="w-full flex-1 btn text-primary bg-[#EDEDFE] min-h-[2rem] h-[1rem] mr-3">12 Months
                </button>

            </div>
        </div >
    );

}