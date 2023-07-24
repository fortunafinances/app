import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Transfer from "../popup/transfer";
import { useReactiveVar } from "@apollo/client";
import { accounts } from "../../utilities/reactiveVariables";
import Dropdown from "../input/dropdown";

const navItems = ["overview", "holdings", "orders", "activity"];

export default function AppNavigation() {
	const accountList = useReactiveVar(accounts);

	const path = useLocation().pathname;
	const currentPage = path.split("/")[path.split("/").length - 1];
	return (
		<nav className="bg-gray-800 border-l-2 border-gray-200  ">
			<div className="flex flex-row justify-between items-center">
				<div className="text-white flex flex-row items-center px-2">
					<h3 className="text-xl font-semibold border-r-2 pr-2">
						<Dropdown data={accountList} />
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
				<button
					className="btn text-primary bg-[#EDEDFE] min-h-[2rem] h-[1rem] mr-3"
					onClick={() => {
						(
							document.getElementById("transfer_modal")! as HTMLDialogElement
						).showModal();
					}}
				>
					Transfer
				</button>
				<Transfer />
			</div>
		</nav>
	);
}
