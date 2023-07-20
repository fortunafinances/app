import { useEffect } from 'react';
import { handleAuthentication } from "../utilities/auth";

const Callback = () => {
  useEffect(() => {
		async function handleCallback() {
			console.log("callback...");
			// Handle the callback logic here
			// e.g., retrieve user information, set up user session
			await handleAuthentication();
			// Simulate a loading state
			setTimeout(() => {
				// Redirect the user to a desired page
				window.location.href = "/app";
			}, 1000000000); // Adjust the delay as needed
		}
		handleCallback().catch((error) => console.error(error));
	}, []);

	return <div>Redirecting you to the dashboard...</div>;
};

export default Callback;
