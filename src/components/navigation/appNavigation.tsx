import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useQuery, useReactiveVar } from "@apollo/client";
import { userInfo } from "../../utilities/reactiveVariables";
import AccountDropdown from "../input/accountDropdown";
import { Account } from "../../utilities/types";
import { GET_ACCOUNTS } from "../../utilities/graphQL";
import { getCurrentPath, navItems } from "../../utilities/common";

export default function AppNavigation() {
	const user = useReactiveVar(userInfo);

	const { loading, error, data } = useQuery<{ accounts: Account[] }>(
		GET_ACCOUNTS,
		{ variables: { userId: user?.userId } },
	);

	const path = useLocation().pathname;
	return (
		<nav className="bg-gray-800">
			<div className="flex flex-row justify-between items-center">
				<div className="text-white flex flex-row items-end">
					<h3 className="text-xl font-semibold">
						<AccountDropdown
							data={data?.accounts}
							loading={loading}
							error={error}
						/>
					</h3>
					<div className="px-2 hidden sm:block">
						{navItems.map((item, i) => {
							return (
								<Link key={i} to={item}>
									<p
										className={twMerge(
											"inline-block px-2 py-2 capitalize underline-offset-4",
											item === getCurrentPath(path) &&
												"underline font-semibold",
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
					<button
						className="btn tracking-wider rounded-md text-white text-bold border-info bg-info hover:bg-white hover:text-info hover:border-info hover:border-2 min-h-[2rem] h-[1rem] mr-3"
						onClick={() => {
							(
								document.getElementById(
									"transfer_modal",
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
