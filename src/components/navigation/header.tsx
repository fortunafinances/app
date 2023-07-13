import { Link, useParams } from "react-router-dom";
import SearchBar from "../input/searchBar";
import { CgProfile } from "react-icons/cg";

export default function Header() {
	const { userId } = useParams();

	return (
		<header className="flex items-center w-full bg-gray-200 h-16">
			<div className="flex items-center h-full text-3xl mx-2">
				<h1>
					<b>
						<Link to="/">Fortuna</Link>&nbsp;/&nbsp;
					</b>
					Brokerage Account
				</h1>
			</div>
			<SearchBar />
			<div className="flex flex-row gap-3 items-center text-2xl mx-3">
				<h3>Welcome, {userId}</h3>
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
								<h3 className="card-title">{userId}</h3>
								<Link to={`/edit/${userId}`} className="w-fit">
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
