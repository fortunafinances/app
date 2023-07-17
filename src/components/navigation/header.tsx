import { Link } from "react-router-dom";
import SearchBar from "../input/searchBar";
import { CgProfile } from "react-icons/cg";
import {
	accounts,
	currentAccountId,
	userId,
} from "../../utilities/reactiveVariables";
import { useReactiveVar } from "@apollo/client/react/hooks/useReactiveVar";

export default function Header() {
	const userAccount = useReactiveVar(userId);
	const currentAccountNumber = useReactiveVar(currentAccountId);

	const currentAccount = accounts.find(
		(item) => item.id === currentAccountNumber
	);

	return (
		<header className="flex items-center w-full bg-gray-200 py-2">
			<div className="flex items-center h-full text-3xl mx-2">
				<h1 className="hidden lg:inline">
					<b>
						<Link to="/">
							<span className="hover-scale-helper hover:scale-110">
								Fortuna
							</span>
						</Link>
						&nbsp;/&nbsp;
					</b>
					{currentAccount!.name} Account
				</h1>
			</div>
			<SearchBar />
			<div className="flex flex-row gap-3 items-center text-2xl mx-3">
				<h3 className="hidden lg:inline">Welcome, {userAccount.username}</h3>
				<div className="dropdown dropdown-end">
					<label tabIndex={0} className="cursor-pointer">
						<CgProfile size={40} />
					</label>
					<div
						tabIndex={0}
						className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-primary text-primary-content"
					>
						<div className="card-body">
							<div className="flex flex-row justify-between items-center">
								<h3 className="card-title">{userAccount.username}</h3>
								<Link to={`/editProfile`} className="w-fit">
									Edit profile
								</Link>
							</div>
							<Link to="/" className="btn btn-outline btn-secondary">
								Log Out
							</Link>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
