import { gql, useLazyQuery, useReactiveVar } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import {
    userInfo,
} from "../../utilities/reactiveVariables";
import { useEffect, useState } from "react";

const ASK_GPT = gql`
    query GenAIQuery($input: [String]!) {
    genAIQuery(input: $input)
}
`


export default function StockSuggestion() {
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
    const navigate = useNavigate();
    const user = useReactiveVar(userInfo);

    const [askGPT] = useLazyQuery<{genAIQuery: string}>(ASK_GPT);

    useEffect(() => {
        askGPT({variables: {input: ["environment"]}}).then((res) => {
            console.log(res);
        }).catch((err) => console.error(err));
    }, [askGPT])


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
    const SuggestionButton = ({ text, ...props }) => {
        const isDisabled = selections.length >= 5 && !selections.includes(text);
        return (
            <button
                className={`focus:bg-[#2a0066] focus:text-gray-50 flex-1 px-5 py-2.5 relative group overflow-hidden font-medium bg-transparent-50 text-gray-600 border border-[#2a0066] hover:border-success-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-success-600 inline-block rounded m-1 
                            ${isBtnSelected(text) ? 'bg-[#2a0066] text-gray-50' : ''}
                            ${isDisabled ? 'opacity-20' : ''}`}
                disabled={isDisabled}
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
                    Let's invest in your first stock
                </h1>
            </div>
            <div className="bg-accent p-4 text-primary">
                <h1 className="text-1xl md:text-3xl">Select 5 categories that you're most interested in</h1>
                <hr className="h-[2px] my-8 bg-primary border-0"></hr>
                <div className="App">
                    <center>
                        {categories.map((item, index) => (
                            <SuggestionButton
                                key={index}
                                text={item}
                                onClick={() => btnSelection(item)}
                                isSelected={isBtnSelected(item)}
                            />
                        ))}

                        <button
                            className={`mt-5 w-full bg-[#2a0066] text-gray-50 flex-1 px-5 py-2.5 relative group overflow-hidden font-medium bg-transparent-50 text-gray-600 border border-[#2a0066] hover:border-success-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-success-600 inline-block rounded m-2 
                            
                            `}

                        >
                            Get Stocks Recomendattion
                        </button>
                    </center>
                    {/* <button
                            type="submit"
                            className="flex flex-row justify-end mt-5"
                        >
                            <BsArrowRight
                                size={60}
                                className="transition duration:500 hover:scale-125 hover:fill-[#7c1fff]"
                            />
                        </button> */}
                </div>
            </div>
        </div>
    );
}






