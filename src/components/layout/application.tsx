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
import { mobile } from "../../utilities/common";
import { useWindowSize } from "../../utilities/hooks";

export default function ApplicationLayout() {
	const windowSize = useWindowSize();
	const isMobile =
		windowSize.width !== undefined ? windowSize.width <= 600 : false;
	const collapsed = useReactiveVar(sidebarClosed);

	return (
		<div className="flex flex-col h-screen">
			<div>
				<Header />
			</div>
			<div className="flex flex-row grow h-full">
				<SideBar />
				{!(mobile && !collapsed) && (
					<div className="flex flex-col grow h-full">
						{!isMobile && (
							<>
								<AppNavigation />
							</>
						)}
						<main className="relative h-full">
							<AutoSizer>
								{({ height, width }: Size) => {
									return (
										<div
											style={{
												height: height - 1,
												width: width - 1,
											}}
											className="overflow-auto"
										>
											<Outlet />
										</div>
									);
								}}
							</AutoSizer>
						</main>
					</div>
				)}
			</div>
			<Transfer />
			<TransferSuccessful transfer={true} modalId="transfer_successful" />
			<ErrorNotification modalId="transfer_error" message="" />
		</div>
	);
}
