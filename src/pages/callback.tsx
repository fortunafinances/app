import { useEffect } from 'react';
import { handleAuthentication } from "../utilities/auth";
import { useQuery } from "@apollo/client";
import { Account } from "../utilities/types";
import { accounts } from "../utilities/reactiveVariables";
import { GET_ACCOUNTS } from "../utilities/graphQL";

const Callback = () => {
	useEffect(() => {
		function handleCallback() {
			// Handle the callback logic here
			// e.g., retrieve user information, set up user session
			handleAuthentication();
			// Simulate a loading state
			setTimeout(() => {
				// Redirect the user to a desired page
				window.location.href = "/app";
			}, 2000); // Adjust the delay as needed
		}
		handleCallback();
	}, []);

	// Perform first time setup for common overview data
	type AccountQuery = {
		accounts: Account[];
	};
	const { error, data } = useQuery<AccountQuery>(GET_ACCOUNTS);

	if (error) console.error(error);

	useEffect(() => {
		if (data) {
			accounts(data.accounts);
		}
	}, [data]);

	return (
		<div className="w-screen h-screen">
			<div className="flex flex-col absolute-center items-center w-full text-center">
				<div className="text-4xl">Redirecting you to the dashboard...</div>
				<span className="loading loading-dots loading-lg" />
			</div>
		</div>
	);
};

export default Callback;
