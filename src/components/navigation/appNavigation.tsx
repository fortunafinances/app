import { Link } from "react-router-dom";

const navItems = ["Overview", "Holdings", "Activity"];

export default function AppNavigation() {
	return <nav className="bg-gray-800 h-8 text-white">{navItems.map((item, i) => {
		return (
			<Link key={i} to={item.toLowerCase()}>
				<p className="inline-block px-3 py-2">{item}</p>
			</Link>
		);
	})}</nav>;
}
