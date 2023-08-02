import { useQuery } from "@apollo/client";
import { GET_WATCH_LIST } from "../../utilities/graphQL";
import { Stock } from "../../utilities/types";
import { currentAccountId } from "../../utilities/reactiveVariables";

export default function WatchlistItem() {
	const { loading, error, data } = useQuery<{
		watchList: { id: string; stock: Stock }[];
	}>(GET_WATCH_LIST, { variables: { accId: currentAccountId() } });

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<div className="flex flex-col">
			{data?.watchList.map((watchListItem) => {
				return (
					<div className="card">
						<div className="card-body">
							<div className="flex justify-between">
								<div className="flex flex-col">
									<h5 className="card-title">
										{watchListItem.stock.ticker}
									</h5>
									<p>{watchListItem.stock.name}</p>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
