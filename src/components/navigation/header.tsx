import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useQuery } from "@apollo/client";
import { sidebarClosed, userInfo } from "../../utilities/reactiveVariables";
import { useReactiveVar } from "@apollo/client/react/hooks/useReactiveVar";
import { signout } from "../../utilities/auth";
import AccountDropdown from "../input/accountDropdown";
import { Account } from "../../utilities/types";
import { GET_ACCOUNTS } from "../../utilities/graphQL";
import { useWindowSize } from "../../utilities/hooks";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Header() {
	const windowSize = useWindowSize();
	const user = useReactiveVar(userInfo);
	const { loading, error, data } = useQuery<{ accounts: Account[] }>(
		GET_ACCOUNTS,
		{ variables: { userId: user?.userId } },
	);

	return (
		<header className="flex justify-between items-center bg-primary py-1">
			<div className="flex gap-2 items-center h-full text-3xl ml-2 md:mx-2">
				<button
					className="cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out"
					onClick={() => sidebarClosed(!sidebarClosed())}
				>
					<RxHamburgerMenu color="white" size={35} />
				</button>
				<Link to="/app/overview" className="flex gap-2 items-center">
					{windowSize.width! > 900 && (
						<img
							src="/Logo_1.2.webp"
							alt="Fortuna Logo"
							width="45"
							height="45"
						/>
					)}

					{windowSize.width! > 768 && (
						<h1 className="text-white translate-y-[2px]">
							Fortuna
						</h1>
					)}
				</Link>
			</div>
			{windowSize.width! <= 900 && (
				<AccountDropdown
					data={data?.accounts}
					loading={loading}
					error={error}
				/>
			)}
			<div className="flex flex-row gap-3 sm:items-center text-2xl mr-1 sm:mx-3">
				<h3 className="hidden md:inline text-white">
					Welcome, {user?.firstName + " " + user?.lastName}
				</h3>
				<div className="dropdown dropdown-end">
					<label tabIndex={0} className="cursor-pointer">
						{user?.picture && user?.picture !== "picture" ? (
							<img
								src={user.picture}
								alt="Profile Picture"
								className="max-w-10 max-h-10 w-auto h-auto rounded-full"
							/>
						) : (
							<CgProfile size={40} color="white" />
						)}
					</label>
					<div
						tabIndex={0}
						className="dropdown-content z-[500] card card-compact w-64 p-2 shadow bg-primary text-primary-content"
					>
						<div className="card-body">
							<div className="flex flex-col justify-between">
								<h3 className="card-title ellipsis text-3xl">
									{user?.username}
								</h3>
								<Link
									to={`/profileInfo`}
									className="w-fit hover:underline"
								>
									Edit profile
								</Link>
							</div>
							<button
								className="btn btn-outline btn-secondary"
								onClick={signout}
							>
								Log Out
							</button>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
