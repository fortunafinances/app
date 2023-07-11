import { useParams } from "react-router-dom";
import SearchBar from "./searchBar";
import { CgProfile } from "react-icons/cg";

export default function Header() {
		const { userId } = useParams();

	return (
		<header className="flex items-center w-screen bg-gray-200 h-16">
			<div className="flex items-center h-full text-3xl mx-2">
				<h1>
					<b>Fortuna&nbsp;/&nbsp;</b>Brokerage Account
				</h1>
			</div>
			<SearchBar />
			<div className="flex flex-row gap-3 items-center text-2xl mx-3">
				<h3>Welcome, {userId}</h3>
				<CgProfile size={35} />
			</div>
		</header>
	);
}
