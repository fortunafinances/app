import { BsStopwatch, BsChevronCompactDown } from "react-icons/bs";
import { LiaHandshakeSolid } from "react-icons/lia";
import { BiPopsicle } from "react-icons/bi";
import { login, signup } from "../utilities/auth";

export default function UnauthenticatedHomepage() {
	return (
		<>
			<div className="hero min-h-[85vh] bg-primary">
				<div className="hero-content text-center">
					<div className="max-w-md">
						<h1 className="text-8xl font-bold text-secondary">Fortuna</h1>
						<p className="py-6 text-3xl text-secondary">
							Get better results with Fortuna at the helm of your portfolio
						</p>
						<div className="flex flex-row gap-4 justify-center [&>button]:text-xl">
							<button className="btn btn-neutral text-white" onClick={signup}>
								Sign Up
							</button>
							<button className="btn btn-neutral text-white" onClick={login}>
								Login
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="h-[15vh] bg-gradient-to-b from-[#707099] to-[#f0ecd8] flex justify-center align-middle">
				<button
					onClick={() =>
						window.scrollTo({
							top: 400,
							behavior: "smooth",
						})
					}
				>
					<BsChevronCompactDown
						className="fill-[#494963] hover:fill-[#dfdae0]"
						size={64}
					/>
				</button>
			</div>
			<div className="flex flex-row w-full bg-[#f0ecd8] text-left ">
				<div className="grid flex-grow card rounded-box max-w-[60%]  p-7">
					<p className="text-4xl font-bold p-1">
						We love to trade, and we hope you do too!
					</p>
					<p className="text-xl p-1">
						Now you can express that love with the latest trading platform from
						Fortuna. We guarantee a 0-second trade execution, and will give you
						a free popsicle if your trade doesn’t go through in this time period
					</p>
					<p className="text-xl p-1">
						On a side-note, we just bought a big freezer and 10,000 popsicles.
						Thankfully, we’ve hedged all popsicle expenses for the next two
						years! (Commodity experts say popsicles are on the rise)
					</p>
				</div>
				<div className="inline-block h-[250px] min-h-[1em] w-0.5 self-center bg-neutral"></div>
				<div className="grid flex-grow h-[40vh] card rounded-box max-w-[40%] p-7 ml-9">
					<p className="text-4xl font-bold sm: mb-5">
						Every account comes with:
					</p>
					<ul className="text-xl flex flex-col lg: gap-8">
						<li className="inline-flex items-center">
							<BsStopwatch className="mr-4" />
							0-second execution
						</li>
						<li className="inline-flex items-center">
							<LiaHandshakeSolid className="mr-4" />
							Portfolio insurance
						</li>
						<li className="inline-flex items-center">
							<BiPopsicle className="mr-4" />1 popsicle
						</li>
					</ul>
				</div>
			</div>
			<div className="h-[5vh] bg-gradient-to-b from-[#f0ecd8] to-white"></div>
			<footer className="footer pb-8 bg-white text-neutral-conten flex flex-row justify-center gap-20">
				<div>
					<a className="link link-hover">About</a>
				</div>
				<div>
					<a className="link link-hover">Privacy Policy</a>
				</div>
				<div>
					<a className="link link-hover">Contact Us</a>
				</div>
			</footer>
		</>
	);
}
