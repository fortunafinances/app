import SearchBar from "./searchBar";

export default function MainNavbar() {
	return (
		<header className="flex items-center w-screen bg-gray-400 h-16">
			<div className="flex items-center h-full text-3xl mx-2">
				<h1>
					<b>Fortuna&nbsp;/&nbsp;</b>Brokerage Account
				</h1>
			</div>
			<SearchBar />
		</header>
	);
}
