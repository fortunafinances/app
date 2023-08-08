import { useQuery, useReactiveVar } from "@apollo/client";
import { GET_WATCH_LIST } from "../../utilities/graphQL";
import { WatchList } from "../../utilities/types";
import {
	currentAccountId,
	sidebarClosed,
	symbol,
} from "../../utilities/reactiveVariables";
import { useNavigate } from "react-router-dom";
import {
	formatDollars,
	makeEllipsis,
	percentChange,
} from "../../utilities/common";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { useWindowSize } from "../../utilities/hooks";
import AutoSizer, { Size } from "react-virtualized-auto-sizer";
import { useEffect } from "react";

export default function WatchList() {
	const windowWidth = useWindowSize().width;
	const navigate = useNavigate();
	const accountId = useReactiveVar(currentAccountId);
	const { loading, error, data, refetch } = useQuery<WatchList>(
		GET_WATCH_LIST,
		{
			variables: { accId: accountId },
		},
	);

	useEffect(() => {
		refetch().catch((err) => {
			console.error(err);
		});
	}, [accountId, refetch]);

	if (loading) return <></>;
	if (error) return <p>Error :(</p>;

	const handleClick = (ticker: string) => {
		symbol(ticker);
		if (windowWidth! < 640) {
			sidebarClosed(true);
		}
		navigate("/app/trade");
	};

	if (data?.watchList.length === 0) return <></>;

	return (
		<>
			<h2 className="py-1 font-bold w-full text-center text-lg bg-[#110029] text-white border-t-[2px] sm:border-none">
				Watch List
			</h2>
			<div
				className={`flex flex-col h-full z-50 overflow-y-auto overflow-x-hidden`}
			>
				<AutoSizer>
					{({ height, width }: Size) => {
						return (
							<div
								className="w-full [&>*]:w-full"
								style={{
									minHeight: height - 1,
									width: width,
								}}
							>
								{data?.watchList.map((watchListItem, i) => {
									return (
										<button
											className={twMerge(
												"card rounded-none text-black border-t-[1px] border-black group hover:scale-[1.15] hover:translate-x-2 transition-transform duration-100 ease-in-out",
												watchListItem.stock.currPrice! >
													watchListItem.stock
														.prevClosePrice!
													? "bg-[#c7ffcd]"
													: "bg-[#ffbebe]",
											)}
											onClick={() => {
												handleClick(
													watchListItem.stock.ticker,
												);
											}}
											key={i}
										>
											<div className="card-body w-full p-1">
												<div className="flex flex-row w-full justify-between px-8 sm:px-[8px]">
													<div className="flex flex-col text-left">
														<h5 className="card-title text-sm font-bold">
															{
																watchListItem
																	.stock
																	.ticker
															}
														</h5>
														<p className="text-xs ellipsis max-w-5">
															{windowWidth! < 640
																? watchListItem
																		.stock
																		.name
																: makeEllipsis(
																		15,
																		watchListItem
																			.stock
																			.name,
																  )}
														</p>
													</div>
													<div className="flex flex-col group-hover:-translate-x-5 transition-transform duration-100 ease-in-out text-right">
														<h5 className="text-sm font-bold">
															{formatDollars(
																watchListItem
																	.stock
																	.currPrice,
															)}
														</h5>
														<div className="flex items-center">
															{watchListItem.stock
																.currPrice! >
															watchListItem.stock
																.prevClosePrice! ? (
																<AiFillCaretUp />
															) : (
																<AiFillCaretDown />
															)}
															<p className="text-sm font-extralight">
																{percentChange(
																	watchListItem
																		.stock
																		.currPrice,
																	watchListItem
																		.stock
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
						);
					}}
				</AutoSizer>
			</div>
		</>
	);
}
