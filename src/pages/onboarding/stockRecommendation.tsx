import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { stockSuggestionCategories } from "../../utilities/common";

const ASK_GPT = gql`
	query GenAIQuery($input: [String]!) {
		genAIQuery(input: $input)
	}
`;

export default function StockRecommendation() {
	const [selections, setSelections] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const [askGPT] = useLazyQuery<{ genAIQuery: string }>(ASK_GPT);

	const btnSelection = (category: string) => {
		if (selections.length < 5 && !selections.includes(category)) {
			setSelections([...selections, category]);
		}
		if (selections.includes(category)) {
			const updatedSelections = selections.filter(
				(item) => item !== category,
			);
			setSelections(updatedSelections);
		}
	};

	const isBtnSelected = (category: string) => {
		return selections.length > 0 && selections.includes(category);
	};

	// create buttons to display
	const SuggestionButton = ({
		text,
		onClick,
		isSelected,
	}: {
		text: string;
		onClick: () => void;
		isSelected: boolean;
	}) => {
		const isDisabled = selections.length >= 5 && !selections.includes(text);
		return (
			<button
				className={`focus:bg-[#2a0066] focus:text-gray-50 flex-1 px-5 py-2.5 relative group overflow-hidden font-medium bg-transparent-50 text-gray-600 border border-[#2a0066] hover:border-success-600 hover:bg-secondary hover:bg-opacity-40 hover:text-success-600 inline-block rounded m-1 
                            ${
								isBtnSelected(text)
									? "bg-[#2a0066] hover:text-black text-white"
									: ""
							}
                            ${isDisabled ? "opacity-20" : ""}`}
				disabled={isDisabled && !isSelected}
				onClick={onClick}
			>
				{text}
			</button>
		);
	};

	const isDisabled = selections.length < 1;
	const navigate = useNavigate();
	const getGPTResponse = (options: string[]) => {
		setLoading(true);
		askGPT({ variables: { input: options } })
			.then((res) => {
				navigate("/stockResults", {
					state: { parameter: res?.data?.genAIQuery },
				});
			})
			.catch((err) => console.error(err));
	};

	return (
		<div className="h-screen flex md:[&>div]:w-[50%]">
			<div className="hidden md:flex flex-col gap-5 bg-primary text-accent p-8">
				<h1 className=" mt-[30%] font-semibold text-left md:text-7xl text-5xl">
					Let's invest in your first stock
				</h1>
			</div>
			{loading ? (
				<div className="flex justify-center items-center w-full">
					<div className="flex items-end gap-1">
						<p className="text-2xl font-bold">
							Finding Stocks for You
						</p>
						<span className="loading loading-dots loading-sm translate-y-[2px]"></span>
					</div>
				</div>
			) : (
				<div className="bg-accent overflow-y-auto p-4 text-primary">
					<h1 className="text-2xl md:text-3xl">
						Select up to 5 categories that you're most interested in
					</h1>
					<hr className="h-[2px] my-8 bg-primary border-0"></hr>
					<div className="App">
						<center>
							<div id="select">
								{stockSuggestionCategories.map(
									(item, index) => (
										<SuggestionButton
											key={index}
											text={item}
											onClick={() => btnSelection(item)}
											isSelected={isBtnSelected(item)}
										/>
									),
								)}
								<div className="flex gap-2 flex-col md:flex-row text-xl md:text-2xl">
									<button
										className={`px-5 py-2.5 relative group overflow-hidden font-medium bg-transparent-50 border border-[#2a0066] rounded
                                        ${
											isDisabled
												? "bg-neutral-500 opacity-10 text-black"
												: "bg-[#2a0066] text-white hover:border-success-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-black"
										}`}
										disabled={isDisabled}
										onClick={() =>
											getGPTResponse(selections)
										}
									>
										Get Stock Recommendations
									</button>
									<button
										className={`bg-[#2a0066] text-white flex-1 relative group overflow-hidden font-medium bg-transparent-50 border border-[#2a0066] hover:border-success-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-black rounded`}
										onClick={() => navigate("/app")}
									>
										Skip
									</button>
								</div>
							</div>
						</center>
					</div>
				</div>
			)}
		</div>
	);
}
