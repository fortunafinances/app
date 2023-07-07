import { Outlet } from "react-router-dom";
import MainNavbar from "../navigation/mainNavbar";
import SideBar from "../navigation/sideBar";

export default function ApplicationLayout() {
	return (
		<div className="flex flex-col h-screen">
			<MainNavbar />
			<div className="flex flex-row grow">
				<SideBar />
				<div className="flex flex-col grow">
					<nav className="bg-gray-200 h-8">Navbar</nav>
					<main>
						<Outlet />
					</main>
				</div>
			</div>
		</div>
	);
}
