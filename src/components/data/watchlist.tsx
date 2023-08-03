import { useQuery } from "@apollo/client";
import { GET_WATCH_LIST } from "../../utilities/graphQL";
import { Stock } from "../../utilities/types";
import { currentAccountId, symbol } from "../../utilities/reactiveVariables";
import { useNavigate } from "react-router-dom";
import { formatDollars, percentChange } from "../../utilities/common";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

export default function WatchList() {
	const navigate = useNavigate();
	const { loading, error, data } = useQuery<{
		watchList: { id: string; stock: Stock }[];
	}>(GET_WATCH_LIST, { variables: { accId: currentAccountId() } });

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	const handleClick = (ticker: string) => {
		symbol(ticker);
		navigate("/app/trade");
	};

	return (
		<div className="flex flex-col h-full">
			<h2 className="py-1 font-bold w-full text-center text-lg bg-gray-200 text-black">
				Watch List
			</h2>
			<div className=" w-full [&>*]:w-full">
				{data?.watchList.map((watchListItem, i) => {
					return (
						<button
							className={twMerge(
								"card rounded-none text-black border-t-[1px] border-black group hover:scale-110 hover:translate-x-3 transition-transform duration-100 ease-in-out",
								watchListItem.stock.currPrice! >
									watchListItem.stock.prevClosePrice!
									? "bg-[#c7ffcd]"
									: "bg-[#ffbebe]",
							)}
							onClick={() => {
								handleClick(watchListItem.stock.ticker);
							}}
							key={i}
						>
							<div className="card-body w-full p-1">
								<div className="flex w-full justify-between">
									<div className="flex flex-col">
										<h5 className="card-title text-sm">
											{watchListItem.stock.ticker}
										</h5>
										<p className="text-xs ellipsis max-w-5">
											{watchListItem.stock.name}
										</p>
									</div>
									<div className="flex flex-col group-hover:-translate-x-5 transition-transform duration-100 ease-in-out">
										<h5 className="text-sm">
											{formatDollars(
												watchListItem.stock.currPrice,
											)}
										</h5>
										<div className="flex items-center">
											{watchListItem.stock.currPrice! >
											watchListItem.stock
												.prevClosePrice! ? (
												<AiFillCaretUp />
											) : (
												<AiFillCaretDown />
											)}
											<p>
												{percentChange(
													watchListItem.stock
														.currPrice,
													watchListItem.stock
														.prevClosePrice,
												)}
												%
											</p>
										</div>
									</div>
								</div>
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
}
