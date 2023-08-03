import { useQuery } from "@apollo/client";
import { GET_WATCH_LIST } from "../../utilities/graphQL";
import { Stock } from "../../utilities/types";
import { currentAccountId, symbol } from "../../utilities/reactiveVariables";
import { useNavigate } from "react-router-dom";
import { formatDollars } from "../../utilities/common";

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
			{data?.watchList.map((watchListItem, i) => {
				return (
					<button
						className="card bg-gray-200 rounded-none text-primary border-t-[1px] border-black group hover:scale-110 hover:translate-x-3 transition-transform duration-100 ease-in-out"
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
								</div>
							</div>
						</div>
					</button>
				);
			})}
		</div>
	);
}
