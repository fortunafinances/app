import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { useReactiveVar } from "@apollo/client/react/hooks/useReactiveVar";
import { sidebarClosed } from "../../utilities/reactiveVariables";
import TotalAccountValue from "../data/totalAccountValue";
import { getCurrentPath, isMobile, navItems } from "../../utilities/common";
import { useWindowSize } from "../../utilities/hooks";
import WatchList from "../data/watchlist";

export default function SideBar() {
	const windowSize = useWindowSize().width;
	const collapsed = useReactiveVar(sidebarClosed);
	const path = useLocation().pathname;
	const navigate = useNavigate();

	const handleNavClick = (name: string) => {
		if (windowSize! < 640) sidebarClosed(true);
		navigate("/app/" + name.toLowerCase().replace(" ", "-"));
	};

	return (
		<div className={"relative h-full"}>
			<div
				className={twMerge(
					"h-full bg-[#110029] text-white flex flex-col",
					collapsed
						? isMobile(windowSize)
							? "w-0"
							: "w-10"
						: "w-screen sm:w-52",
				)}
			>
				<div>
					{!collapsed && <TotalAccountValue />}
					{!collapsed && isMobile(windowSize) && (
						<div className="px-2 flex flex-col text-center text-2xl">
							{navItems.map((item, i) => {
								return (
									<button
										key={i}
										onClick={() => handleNavClick(item)}
										className="w-full"
									>
										<p
											className={twMerge(
												"inline-block capitalize underline-offset-4",
												item === getCurrentPath(path) &&
													"underline font-semibold",
											)}
										>
											{item}
										</p>
									</button>
								);
							})}
							<button
								className="w-full"
								onClick={() => {
									(
										document.getElementById(
											"transfer_modal",
										)! as HTMLDialogElement
									).showModal();
								}}
							>
								<p>Transfer</p>
							</button>
						</div>
					)}
				</div>

				{!collapsed && <WatchList />}

				<div className="flex flex-col items-center gap-2 p-1 text-xs">
					{!collapsed && (
						<div className={collapsed ? "absolute bottom-1" : ""}>
							<p className="flex flex-row items-center gap-1">
								<AiOutlineCopyrightCircle
									size={collapsed ? 14 : 18}
								/>
								{!collapsed && 2023} Fortuna
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
