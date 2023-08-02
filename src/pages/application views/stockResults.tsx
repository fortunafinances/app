export default function StockResults() {
    const res = `Based on the request categories provided, here are 5 tickers from the stock list that fall under at least one of the categories:["AAPL", "GOOGL", "MSFT", "META", "TSLA"]`;

    function extractStringArray(inputString: string) {
        const regex = /\[.*?\]/; // Match anything between square brackets
        const match = inputString.match(regex);

        if (match) {
            const arrayString = match[0]; // Extract the first match
            try {
                const array = JSON.parse(arrayString); // Parse the string as JSON array
                if (Array.isArray(array)) {
                    return array;
                }
            } catch (error) {
                console.error('Invalid string array format.');

            }
        }
        return []; // Return an empty array if no valid string array is found
    }

    const tickers = extractStringArray(res);
    console.log(tickers);

    const SuggestionButton = ({ text, ...props }: { text: string }) => {
        
        return (
            <button
                className={` w-full focus:bg-[#2a0066] focus:text-gray-50 flex-1 px-5 py-2.5 relative group overflow-hidden font-medium bg-transparent-50 text-gray-600 border border-[#2a0066] hover:border-success-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-success-600 inline-block rounded m-1         
                            `}
                
                {...props}
            >
                {text}
            </button>
        );
    };
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
                    {tickers.map((item, index) => (
                            <SuggestionButton
                                key={index}
                                text={item}
                                
                                
                            />
                        ))}
                    </center>
                </div>
            </div>
        </div>
    );
}