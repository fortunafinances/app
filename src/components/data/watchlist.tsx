import { useQuery } from "@apollo/client";
import { GET_WATCH_LIST } from "../../utilities/graphQL";
import { WatchList } from "../../utilities/types";
import {
	currentAccountId,
	sidebarClosed,
	symbol,
} from "../../utilities/reactiveVariables";
import { useNavigate } from "react-router-dom";
import { formatDollars, percentChange } from "../../utilities/common";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { useWindowSize } from "../../utilities/hooks";

export default function WatchList() {
	const windowWidth = useWindowSize().width;
	const navigate = useNavigate();
	const { loading, error, data } = useQuery<WatchList>(GET_WATCH_LIST, {
		variables: { accId: currentAccountId() },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	const handleClick = (ticker: string) => {
		symbol(ticker);
		if (windowWidth! < 640) {
			sidebarClosed(true);
			navigate("/app/trade");
		}
	};

	function makeSubstring(name: string | undefined) {
		let toret = "";
		if (name !== undefined && name.length > 15 && windowWidth! > 640) {
			toret = name.substring(0, 16) + "...";
		} else {
			return name;
		}
		return toret;
	}

	return (
		<div className="flex flex-col overflow-y-auto overflow-x-hidden">
			<div className=" w-full [&>*]:w-full ">
				{data?.watchList.map((watchListItem, i) => {
					return (
						<button
							className={twMerge(
								"card rounded-none text-black border-t-[1px] border-black group hover:scale-[1.15] hover:translate-x-2 transition-transform duration-100 ease-in-out",
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
								<div className="flex flex-row w-full justify-between px-8 sm:px-[8px]">
									<div className="flex flex-col text-left">
										<h5 className="card-title text-sm font-bold">
											{watchListItem.stock.ticker}
										</h5>
										<p className="text-xs ellipsis max-w-5">
											{makeSubstring(
												watchListItem.stock.name,
											)}
										</p>
									</div>
									<div className="flex flex-col group-hover:-translate-x-5 transition-transform duration-100 ease-in-out text-right">
										<h5 className="text-sm font-bold">
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
											<p className="text-sm font-extralight">
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
