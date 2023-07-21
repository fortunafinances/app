import { Outlet } from "react-router-dom";
import Header from "../navigation/header";
import SideBar from "../navigation/sideBar";
import AppNavigation from "../navigation/appNavigation";
import AutoSizer, { Size } from "react-virtualized-auto-sizer";

export default function ApplicationLayout() {
	return (
		<div className="flex flex-col h-screen">
			<Header />
			<div className="flex flex-row grow h-full">
				<SideBar />
				<div className="flex flex-col grow h-full overflow-none">
					<AppNavigation />
					<main className="relative h-full overflow-none">
						<AutoSizer>
							{({ height, width }: Size) => (
								<div style={{ height, width }} className="overflow-y-auto">
									<Outlet />
								</div>
							)}
						</AutoSizer>
					</main>
				</div>
			</div>
		</div>
	);
}
