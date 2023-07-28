import { Link } from "react-router-dom";

export default function NoInvestments() {
	return (
		<div className="h-full w-full flex flex-col justify-center items-center text-2xl">
			<h2 className="text-5xl">No Investments Yet...</h2>
			<Link
				to="/app/trade"
				className="hover:underline underline-offset-8 text-primary"
			>
				Click here to place your first order
			</Link>
		</div>
	);
}