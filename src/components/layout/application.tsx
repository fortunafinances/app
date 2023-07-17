import { Outlet } from "react-router-dom";
import Header from "../navigation/header";
import SideBar from "../navigation/sideBar";
import AppNavigation from "../navigation/appNavigation";

export default function ApplicationLayout() {
	return (
		<div className="flex flex-col h-screen">
			<Header />
			<div className="flex flex-row grow h-full">
				<SideBar />
				<div className="flex flex-col grow h-full">
					<AppNavigation />
					<main className="relative h-full">
						<Outlet />
					</main>
				</div>
			</div>
		</div>
	);
}
