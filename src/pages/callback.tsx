import { useEffect, useState } from "react";
import { handleAuthentication } from "../utilities/auth";
import { useReactiveVar } from "@apollo/client";
import { currentAccountId, userInfo } from "../utilities/reactiveVariables";
import { useNavigate } from "react-router-dom";

const Callback = () => {
	const navigate = useNavigate();
	const [connectionError, setConnectionError] = useState(false);
	const accId = useReactiveVar(currentAccountId);
	const user = useReactiveVar(userInfo);

	useEffect(() => {
		// Handle the callback logic here
		// e.g., retrieve user information, set up user session
		handleAuthentication();

		setTimeout(() => {
			setConnectionError(true);
		}, 10000);

		setTimeout(() => {
			if (accId == 0) {
				navigate("/createProfile", { replace: true });
			} else if (accId == 1) {
				navigate("/app", { replace: true });
			}

		}, 2000);
	}, [accId, navigate, user]);

	return (
		<div className="w-screen h-screen">
			<div className="flex flex-col absolute-center items-center w-full text-center">
				{connectionError ? (
					<div className="text-red-500 text-xl md:text-4xl">
						Error Connecting to Backend
					</div>
				) : (
					<div className="flex justify-end content-end items-end text-4xl">
						Redirecting
						<span className="loading loading-dots loading-md" />
					</div>
				)}
			</div>
		</div>
	);
};

export default Callback;
