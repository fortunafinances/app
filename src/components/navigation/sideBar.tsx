import { Link } from "react-router-dom";
import Dropdown from "../input/dropdown";
import {
	AiOutlineArrowLeft,
	AiOutlineArrowRight,
	AiOutlineCopyrightCircle,
} from "react-icons/ai";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const people = [
	{ id: 1, name: "Brokerage", unavailable: false },
	{ id: 2, name: "College Fund", unavailable: false },
	{ id: 3, name: "Extremely Super Duper Long Name Fund", unavailable: false },
];

export default function SideBar() {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<div className="relative h-full">
			<div
				className={twMerge(
					"h-full bg-gray-800 text-white flex flex-col justify-between",
					collapsed ? "w-16" : "w-64"
				)}
			>
				<div className={twMerge("flex flex-col", collapsed && "text-vertical")}>
					{!collapsed && <h2 className="mx-1 text-xl">Accounts</h2>}
					<Dropdown data={people} />
				</div>
				<button
					onClick={() => setCollapsed(!collapsed)}
					className="absolute right-0 bg-gray-200 text-black w-fit py-4 rounded-l-md top-[50%] -translate-y-[50%]"
				>
					{collapsed ? (
						<AiOutlineArrowRight size={20} />
					) : (
						<AiOutlineArrowLeft size={20} />
					)}
				</button>
				<div className="flex flex-col items-center gap-2 p-1 text-xs">
					{!collapsed && (
						<div className="flex flex-row justify-between w-full [&>*]:hover-scale">
							<Link to="/about" className="hover:underline">About Fortuna</Link>
							<Link to="/privacy" className="hover:underline">Privacy Policy</Link>
							<Link to="/contact" className="hover:underline">Contact Us</Link>
						</div>
					)}
					<p className="flex flex-row items-center gap-1">
						<AiOutlineCopyrightCircle size={collapsed ? 14 : 18} />{" "}
						{!collapsed && 2023} Fortuna
					</p>
				</div>
			</div>
		</div>
	);
}
