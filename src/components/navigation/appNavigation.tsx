import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useQuery, useReactiveVar } from "@apollo/client";
import { userInfo } from "../../utilities/reactiveVariables";
import AccountDropdown from "../input/accountDropdown";
import { Account } from "../../utilities/types";
import { GET_ACCOUNTS } from "../../utilities/graphQL";

const navItems = ["overview", "holdings", "orders", "activity"];

export default function AppNavigation() {
	const user = useReactiveVar(userInfo);

	const { loading, error, data } = useQuery<{ accounts: Account[] }>(
		GET_ACCOUNTS,
		{ variables: { userId: user?.userId } }
	);


	const path = useLocation().pathname;
	const currentPage = path.split("/")[path.split("/").length - 1];
	return (
		<nav className="bg-gray-800">
			<div className="flex flex-row justify-between items-center">
				<div className="text-white flex flex-row items-end">
					<h3 className="text-xl font-semibold">
						<AccountDropdown data={data?.accounts} loading={loading} error={error} />
					</h3>
					<div>
						{navItems.map((item, i) => {
							return (
								<Link key={i} to={item}>
									<p
										className={twMerge(
											"inline-block px-3 py-2 capitalize underline-offset-4",
											item === currentPage && "underline font-semibold"
										)}
									>
										{item}
									</p>
								</Link>
							);
						})}
					</div>
				</div>
				<div className="tracking-narrow">
					<Link to="/app/trade">
						<button className="btn tracking-wider text-primary bg-[#EDEDFE] min-h-[2rem] h-[1rem] mr-3">
							Trade
						</button>
					</Link>
					<button
						className="btn tracking-wider text-white bg-primary hover:bg-purple-800 min-h-[2rem] h-[1rem] mr-3"
						onClick={() => {
							(
								document.getElementById(
									"new_transfer_modal"
								)! as HTMLDialogElement
							).showModal();
						}}
					>
						Transfer
					</button>
				</div>
			</div>
		</nav>
	);
}
