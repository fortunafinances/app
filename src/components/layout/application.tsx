import { Outlet } from "react-router-dom";
import Header from "../navigation/header";
import SideBar from "../navigation/sideBar";
import AppNavigation from "../navigation/appNavigation";
import AutoSizer, { Size } from "react-virtualized-auto-sizer";
import TransferSuccessful from "../popup/transferSuccessful";
import ErrorNotification from "../popup/errorNotif";
import Transfer from "../popup/transfer";
import { useReactiveVar } from "@apollo/client";
import { sidebarClosed } from "../../utilities/reactiveVariables";

export default function ApplicationLayout() {
	const sidebar = useReactiveVar(sidebarClosed);
	return (
		<div className="flex flex-col h-screen">
			<Header />
			<div className="flex flex-row grow h-full">
				<SideBar />
				<div className="flex flex-col grow h-full">
					{sidebar && <AppNavigation />}
					<main className="relative h-full">
						{sidebar && (
							<AutoSizer>
								{({ height, width }: Size) => {
									return (
										<div
											style={{
												height: height - 1,
												width: width - 1,
											}}
											className="overflow-y-auto"
										>
											<Outlet />
										</div>
									);
								}}
							</AutoSizer>
						)}
					</main>
				</div>
			</div>
			<Transfer />
			<TransferSuccessful transfer={true} modalId="transfer_successful" />
			<ErrorNotification />
		</div>
	);
}
