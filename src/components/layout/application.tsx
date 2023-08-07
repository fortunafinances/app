import { Outlet } from "react-router-dom";
import Header from "../navigation/header";
import SideBar from "../navigation/sideBar";
import AppNavigation from "../navigation/appNavigation";
import AutoSizer, { Size } from "react-virtualized-auto-sizer";
import TransferSuccessful from "../popup/successfulNotification";
import ErrorNotification from "../popup/errorNotification";
import Transfer from "../popup/transfer";
import { useReactiveVar } from "@apollo/client";
import { sidebarClosed } from "../../utilities/reactiveVariables";
import { isMobile } from "../../utilities/common";
import { useWindowSize } from "../../utilities/hooks";
import { useRef } from "react";

export default function ApplicationLayout() {
	const windowSize = useWindowSize().width;
	const collapsed = useReactiveVar(sidebarClosed);
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<div className="flex flex-col h-screen-responsive" ref={containerRef}>
			<Header />
			<div className="flex flex-row grow h-full">
				<SideBar />
				{!(isMobile(windowSize) && !collapsed) && (
					<div className="flex flex-col grow h-full">
						{!isMobile(windowSize) && <AppNavigation />}
						<main className="relative h-full z-20 bg-white">
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
			<ErrorNotification
				modalId="transfer_error"
				message="Transfer Error"
			/>
		</div>
	);
}
