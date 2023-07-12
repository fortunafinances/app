import { Outlet } from "react-router-dom";
import Header from "../navigation/header";
import SideBar from "../navigation/sideBar";
import AppNavigation from "../navigation/appNavigation";

export default function ApplicationLayout() {
	return (
		<div className="flex flex-col h-screen">
			<Header />
			<div className="flex flex-row grow">
				<SideBar />
				<div className="flex flex-col grow">
					<AppNavigation />
					<main className="relative h-full">
						<Outlet />
					</main>
				</div>
			</div>
		</div>
	);
}
