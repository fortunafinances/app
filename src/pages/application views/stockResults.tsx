import { useQuery } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { GET_ONE_STOCK } from '../../utilities/graphQL';
import { symbol } from '../../utilities/reactiveVariables';

type StockData = {
    oneStock: {
        name: string;
        currPrice: GLfloat;
    }
}

export default function StockResults() {
    const state = useLocation().state as { parameter: string };
    const parameter = state.parameter;

    function extractStringArray(inputString: string) {
        const regex = /\[.*?\]/; // Match anything between square brackets
        const match = inputString.match(regex);

        if (match) {
            const arrayString = match[0]; // Extract the first match
            try {
                const array = JSON.parse(arrayString) as string[]; // Parse the string as JSON array
                if (Array.isArray(array)) {
                    return array;
                }
            } catch (error) {
                console.error('Invalid string array format.');
            }
        }
        return []; // Return an empty array if no valid string array is found
    }

    const tickers = extractStringArray(parameter);
    // console.log(tickers);

    const SuggestionButton = ({ symbol, onClick }: { symbol: string, onClick: () => void }) => {
        const { loading, error, data: stockData } = useQuery<StockData>(GET_ONE_STOCK, { variables: { ticker: symbol } })
        if (loading)
            return <span className="loading loading-infinity loading-lg"></span>;
        if (error) {
            return (
                <div className="w-full h-full flex flex-row justify-center items-center">
                    <h2>{error.message}</h2>
                </div>
            );
        }
        const title = stockData?.oneStock.name as string;
        const price = stockData?.oneStock.currPrice as number;
        return (
            <button className="w-full focus:bg-[#2a0066] focus:text-gray-50 px-5 py-2.5 relative overflow-hidden font-medium bg-transparent-50 text-gray-600 border border-[#2a0066] hover:border-success-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-success-600 rounded m-1"
                onClick={onClick}    >
                <div className=" top-1 left">
                    <div className='text-black'>{title}</div>
                    <div>{symbol}</div>
                </div>
                <div className="absolute top-1 right-1.5 text-green-800 py-0.5 px-2 rounded">
                    ${price}
                </div>
            </button>
        );
    };

    const navigate = useNavigate();
    function handleBuyStock(item: string) {
        symbol(item);
        navigate('/app/trade');
    }

    return (
        <div className="h-screen flex [&>div]:w-[50%]">
            <div className="flex flex-col gap-5 bg-primary text-accent p-8">
                <h1 className=" mt-[30%] font-semibold text-left md:text-7xl text-5xl">
                    Your First Investment
                </h1>
            </div>
            <div className="bg-accent overflow-y-auto p-4 text-primary">
                <h1 className="text-1xl md:text-3xl">Buy A Stock</h1>
                <hr className="h-[2px] my-8 bg-primary border-0"></hr>
                <div className="App">
                    <center>
                        {tickers.map((item) => {
                            return <SuggestionButton
                                symbol={item}
                                onClick={() => handleBuyStock(item)}
                            />
                        })}

                    </center>
                </div>
            </div>
        </div>
    );
}