import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const navItems = ["overview", "holdings", "activity"];

export default function AppNavigation() {
	const path = useLocation().pathname;
	const currentPage = path.split("/")[path.split("/").length - 1];
	return (
		<nav className="bg-gray-800 border-l-2 border-gray-200 text-white">
			{navItems.map((item, i) => {
				return (
					<Link key={i} to={item}>
						<p
							className={twMerge(
								"inline-block px-3 py-2 capitalize underline-offset-4",
								item === currentPage && "underline font-semibold"
							)}
						>
							{item}
						</p>
					</Link>
				);
			})}
		</nav>
	);
}
