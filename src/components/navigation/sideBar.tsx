import { useLocation, useNavigate } from "react-router-dom";
import {
	AiOutlineArrowLeft,
	AiOutlineArrowRight,
	AiOutlineCopyrightCircle,
} from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { useReactiveVar } from "@apollo/client/react/hooks/useReactiveVar";
import { sidebarClosed } from "../../utilities/reactiveVariables";
import TotalAccountValue from "../data/totalAccountValue";
import { navItems } from "../../utilities/config";
import { getCurrentPath } from "../../utilities/common";

export default function SideBar() {
	const collapsed = useReactiveVar(sidebarClosed);
	const path = useLocation().pathname;
	const navigate = useNavigate();

	const handleNavClick = (name: string) => {
		if (window.screen.width < 640) sidebarClosed(true);
		navigate("/app/" + name.toLowerCase().replace(" ", "-"));
	};

	return (
		<div className={'relative h-full ${collapsed ? "" : "w-4/5"}'}>
			<div
				className={twMerge(
					"h-full bg-gray-800 text-white flex flex-col justify-between",
					collapsed ? "w-6" : "w-screen sm:w-48",
				)}
			>
				<div>
					{!collapsed && <TotalAccountValue />}
					{!collapsed && window.screen.width <= 640 && (
						<div className="px-2 flex flex-col items-center text-2xl">
							{navItems.map((item, i) => {
								return (
									<button
										key={i}
										onClick={() => handleNavClick(item)}
									>
										<p
											className={twMerge(
												"inline-block px-2 py-2 capitalize underline-offset-4",
												item === getCurrentPath(path) &&
													"underline font-semibold",
											)}
										>
											{item}
										</p>
									</button>
								);
							})}
						</div>
					)}
				</div>
				<button
					onClick={() => sidebarClosed(!collapsed)}
					className="absolute right-0 bg-gray-200 text-black w-fit py-4 rounded-l-md top-[50%]  -translate-y-[50%]"
				>
					{collapsed ? (
						<AiOutlineArrowRight size={20} />
					) : (
						<AiOutlineArrowLeft size={20} />
					)}
				</button>
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
