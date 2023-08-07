import { BsStopwatch, BsChevronCompactDown } from "react-icons/bs";
import { LiaHandshakeSolid } from "react-icons/lia";
import { BiPopsicle } from "react-icons/bi";
import { login, signup } from "../utilities/auth";
import { useWindowSize } from "../utilities/hooks";
import { isMobile } from "../utilities/common";

export default function UnauthenticatedHomepage() {
	const windowSize = useWindowSize().width;
	return (
		<>
			<div className="hero min-h-[85vh] bg-primary">
				<div className="hero-content text-center">
					<div className="w-md flex flex-col justify-center items-center gap-2">
						<img
							src="/Logo_1.2.webp"
							alt="Fortuna Logo"
							width={isMobile(windowSize) ? "128" : "222"}
							height={isMobile(windowSize) ? "128" : "222"}
						/>
						<h1 className="text-6xl md:text-9xl font-bold text-accent">
							Fortuna
						</h1>
						<p className="py-2 md:py-6 text-lg md:text-3xl text-secondary">
							Get better results with Fortuna at the helm of your
							portfolio
						</p>
						<div className="flex flex-row gap-4 justify-center [&>button]:bg-[#F2EEFB] [&>button]:text-xl hover:[&>button]:bg-[#2a0066] hover:[&>button]:text-[#F2EEFB] [&>button]:border-current">
							<button
								className="btn text-[#2a0066]"
								onClick={signup}
							>
								Sign Up
							</button>
							<button
								className="btn text-[#2a0066]"
								onClick={login}
							>
								Log In
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="h-[15vh] bg-gradient-to-b from-primary to-accent flex justify-center align-middle">
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
			<div className="flex flex-col md:flex-row w-full bg-accent text-left ">
				<div className="md:max-w-[60%] grid card rounded-box p-7">
					<p className="text-4xl font-bold p-1">
						We love to trade, and we hope you do too!
					</p>
					<p className="text-xl p-1">
						Now you can express that love with the latest trading
						platform from Fortuna. We guarantee a 0-second trade
						execution, and will give you a free popsicle if your
						trade doesn't go through in this time period
					</p>
					<p className="text-xl p-1">
						On a side-note, we just bought a big freezer and 10,000
						popsicles. Thankfully, we've hedged all popsicle
						expenses for the next two years! (Commodity experts say
						popsicles are on the rise)
					</p>
				</div>
				<div className="inline-block h-0.5 w-4/5 md:h-[250px] md:w-0.5 self-center bg-neutral"></div>
				<div className="grid grow-[4] h-[40vh] card rounded-box md:max-w-[40%] p-7 ml-9">
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
			<div className="h-[5vh] bg-gradient-to-b from-accent to-white"></div>
			<footer className="footer py-6 bg-white text-neutral-content flex flex-row justify-evenly">
				<a className="link link-hover" href="/privacyPolicy">
					Privacy Policy
				</a>
				<a
					href="mailto:hello@fortunafinances.com"
					className="link link-hover"
				>
					Contact Us: hello@fortunafinances.com
				</a>
			</footer>
		</>
	);
}
