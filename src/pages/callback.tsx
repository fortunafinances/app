import { useEffect } from 'react';
import { handleAuthentication } from "../utilities/auth";

const Callback = () => {
  useEffect(() => {
		function handleCallback() {
			console.log("callback...");
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
