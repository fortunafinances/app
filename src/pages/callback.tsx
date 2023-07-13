import { useEffect } from 'react';
import { handleAuthentication } from "../auth"

const Callback = () => {
  useEffect(() => {
    console.log("callback...");
    // Handle the callback logic here
    // e.g., retrieve user information, set up user session
    handleAuthentication();
    // Simulate a loading state
    setTimeout(() => {
      // Redirect the user to a desired page
      window.location.href = '/';
    }, 20000000); // Adjust the delay as needed
  }, []);

  return (
    <div>
      <div>Redirecting you to the dashboard...</div>
    </div>
  );
};

export default Callback;
