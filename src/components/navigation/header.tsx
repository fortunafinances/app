import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useQuery } from "@apollo/client";
import { userInfo } from "../../utilities/reactiveVariables";
import { useReactiveVar } from "@apollo/client/react/hooks/useReactiveVar";
import { signout } from "../../utilities/auth";
import AccountDropdown from "../input/accountDropdown";
import { Account } from "../../utilities/types";
import { GET_ACCOUNTS } from "../../utilities/graphQL";
import { isMobile } from "../../utilities/common";
import { useWindowSize } from "../../utilities/hooks";

export default function Header() {
	const windowSize = useWindowSize();
	const user = useReactiveVar(userInfo);
	const { loading, error, data } = useQuery<{ accounts: Account[] }>(
		GET_ACCOUNTS,
		{ variables: { userId: user?.userId } },
	);

	return (
		<header className="flex items-center justify-between bg-primary py-1">
			<div className="flex items-center h-full text-3xl mx-2">
				<h1 className="inline">
					<b className="text-white">
						<Link to="/app/overview">F</Link>
					</b>
				</h1>
			</div>
			{isMobile(windowSize.width) && (
					<div className = "flex flex-row">
						<h3 className="text-xl font-semibold">
							<AccountDropdown
								data={data?.accounts}
								loading={loading}
								error={error}
							/>
						</h3>
				</div>
			)}
			<div className="flex flex-row gap-3 items-center text-2xl mx-3">
				<h3 className="hidden lg:inline text-white capitalize">
					Welcome {user?.firstName + " " + user?.lastName}
				</h3>
				<div className="dropdown dropdown-end">
					<label tabIndex={0} className="cursor-pointer">
						{user?.picture && user?.picture !== "picture" ? (
							<img
								src={user.picture}
								alt="Profile Picture"
								className="w-10 h-10 rounded-full"
							/>
						) : (
							<CgProfile size={40} color="white" />
						)}
					</label>
					<div
						tabIndex={0}
						className="dropdown-content z-[20] card card-compact w-64 p-2 shadow bg-primary text-primary-content"
					>
						<div className="card-body">
							<div className="flex flex-col justify-between">
								<h3 className="card-title text-lg ellipsis">
									{user?.username}
								</h3>
								<Link to={`/profileInfo`} className="w-fit">
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
