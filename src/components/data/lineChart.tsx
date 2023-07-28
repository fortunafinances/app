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
import { useEffect, useMemo, useState } from 'react';
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
    const dateLabels = spData?.stockHistorical.date;
    const spPrice = spData?.stockHistorical.price;

    // console.log("print dateLabels: ", dateLabels);
    // console.log("print price: ", spPrice);

    const labels = useMemo(() => (dateLabels ? [...dateLabels] : []), [dateLabels]);


    // console.log("print labels: ", labels);

    const userPrice = userData?.accountHistorical.value;
    const [range, setRange] = useState([]);

    useEffect(() => {
        setRange(labels);
    }, [labels]);

    // console.log("print range: ", range);

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

    function getLabelForValue(value: number) {
        return labels[value];
    }

    function getMonthName(month: number) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[parseInt(month) - 1];
    }
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
        },
        scales: {
            x: {
                ticks: {
                    callback: (value: number, index: number) => {
                        const currentLabel = getLabelForValue(value);
                        console.log(currentLabel);
                        if (index % 4 === 0) {
                            const [year, month, day] = currentLabel.split('-');
                            const formattedLabel = `${day} ${getMonthName(month)} - ${year.slice(2)}`;
                            return formattedLabel;
                        } else {
                            return '';
                        }
                    },
                },
            },
        },
    };

    console.log(range);

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

    return (
        <div className='w-full' >
            <Line options={chartOptions} data={chartData} />
            <div className="flex mt-5 justify-center">
                {/* 3 months */}
                <button
                    onClick={() => {
                        const newRange = getMostRecentMonths(dateLabels!, 3);
                        setRange(newRange);
                    }}
                    className="w-full flex-1 btn text-primary bg-[#EDEDFE] min-h-[2rem] h-[1rem] mr-3">3 Months
                </button>

                {/* 6 months */}
                <button
                    onClick={() => {
                        const newRange = getMostRecentMonths(dateLabels!, 6);
                        setRange(newRange);
                    }}
                    className="w-full flex-1 btn text-primary bg-[#EDEDFE] min-h-[2rem] h-[1rem] mr-3">6 Months
                </button>

                {/* 12 months */}
                <button
                    onClick={() => {
                        const newRange = getMostRecentMonths(dateLabels!, 12);
                        setRange(newRange);
                    }}
                    className="w-full flex-1 btn text-primary bg-[#EDEDFE] min-h-[2rem] h-[1rem] mr-3">12 Months
                </button>

            </div>
        </div >
    );
}