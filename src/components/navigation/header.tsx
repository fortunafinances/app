import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { userInfo } from "../../utilities/reactiveVariables";
import { useReactiveVar } from "@apollo/client/react/hooks/useReactiveVar";
import { signout } from "../../utilities/auth";

export default function Header() {
	const user = useReactiveVar(userInfo);

	return (
		<header className="flex items-center justify-between bg-primary py-1">
			<div className="flex items-center h-full text-3xl mx-2">
				<h1 className="inline">
					<b className="text-white">
						<Link to="/">Fortuna</Link>
					</b>
				</h1>
			</div>
			<div className="flex flex-row gap-3 items-center text-2xl mx-3">
				<h3 className="hidden lg:inline text-white">
					Welcome {user?.firstName + " " + user?.lastName}
				</h3>
				<div className="dropdown dropdown-end">
					<label tabIndex={0} className="cursor-pointer">
						{user?.picture ? (
							<img
								src={user.picture}
								alt="Profile Picture"
								className="w-10 h-10 rounded-full"
							/>
						) : (
							<CgProfile size={40} />
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
								<Link to={`/editProfile`} className="w-fit">
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
