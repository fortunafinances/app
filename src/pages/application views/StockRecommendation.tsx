import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ASK_GPT = gql`
    query GenAIQuery($input: [String]!) {
    genAIQuery(input: $input)
}
`

export default function StockRecommendation() {
    const categories = ["Technology",
        "Healthcare",
        "Energy",
        "Financial Services",
        "Consumer Goods",
        "Real Estate",
        "Transportation",
        "Media & Entertainment",
        "Retail",
        "Arts & Culture",
        "Social Responsibility",
        "Sustainability",
        "LGBTQ+ Rights",
        "Diversity, Equity, and Inclusion",
        "Women in Leadership",
        "Blockchain",
        "Metaverse",
        "AI"];
    const [selections, setSelections] = useState<string[]>([]);
    const [askGPT] = useLazyQuery<{ genAIQuery: string }>(ASK_GPT);

    const btnSelection = (category: string) => {
        if (selections.length < 5 && !selections.includes(category)) {
            setSelections([...selections, category]);
        }
        if (selections.includes(category)) {
            const updatedSelections = selections.filter((item) => item !== category);
            setSelections(updatedSelections);
        }
        console.log("selections: ", selections);
    }

    const isBtnSelected = (category: string) => {
        return selections.length > 0 && selections.includes(category);
    }

    // create buttons to display
    const SuggestionButton = ({ text, onClick, isSelected }: {text: string; onClick: () => void; isSelected: boolean}) => {
        const isDisabled = selections.length >= 5 && !selections.includes(text);
        return (
            <button
                className={`focus:bg-[#2a0066] focus:text-gray-50 flex-1 px-5 py-2.5 relative group overflow-hidden font-medium bg-transparent-50 text-gray-600 border border-[#2a0066] hover:border-success-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-success-600 inline-block rounded m-1 
                            ${isBtnSelected(text) ? 'bg-[#2a0066] text-white' : ''}
                            ${isDisabled ? 'opacity-20' : ''}`}
                disabled={isDisabled && !isSelected}
                onClick={onClick}>
                {text}
            </button>
        );
    };
    const navigate = useNavigate();
    const getGPTResponse = (options: string[]) => {
        
        askGPT({ variables: { input: options } })
        .then((res) => {
            return res.data;
        })
        .then((res) => {
            console.log(res?.genAIQuery);
            navigate('/stockResults', {state: { parameter: res?.genAIQuery}})
        })
        .catch((err) => console.error(err));
    }
    
    return (
        <div className="h-screen flex [&>div]:w-[50%]">
            <div className="flex flex-col gap-5 bg-primary text-accent p-8">
                <h1 className=" mt-[30%] font-semibold text-left md:text-7xl text-5xl">
                    Let's invest in your first stock
                </h1>
            </div>
            <div className="bg-accent overflow-y-auto p-4 text-primary">
                <h1 className="text-1xl md:text-3xl">Select 5 categories that you're most interested in</h1>
                <hr className="h-[2px] my-8 bg-primary border-0"></hr>
                <div className="App">
                    <center>
                        <div id="select">
                        {categories.map((item, index) => (
                            <SuggestionButton
                                key={index}
                                text={item}
                                onClick={() => btnSelection(item)}
                                isSelected={isBtnSelected(item)}
                            />
                        ))}

                        <button
                            className={`mt-5 flex bg-[#2a0066] text-white flex-1 px-5 py-2.5 relative group overflow-hidden font-medium bg-transparent-50 border border-[#2a0066] hover:border-success-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-black rounded m-2                            
                            `}
                            onClick={() => getGPTResponse(selections)}
                        >
                            Get Stocks Recomendattion
                        </button>
                        </div>
                    </center>
                </div>
            </div>
        </div>
    );
}






