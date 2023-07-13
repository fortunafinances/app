import React, { useEffect } from 'react';
// import { Redirect } from 'react-router-dom';
import { login, handleAuthentication } from "../auth"

const Callback = () => {
  useEffect(() => {
    console.log("callback...");
    // Handle the callback logic here
    // e.g., retrieve user information, set up user session
    handleAuthentication();
    // Simulate a loading state
    setTimeout(() => {
      // Redirect the user to a desired page
      window.location.href = '/buy';
    }, 2000); // Adjust the delay as needed
  }, []);

  return (
    <div>
      <div>Redirecting you to the homepage...</div>
    </div>
  );
};

export default Callback;


// import { useAuth0 } from "@auth0/auth0-react";
// import { Redirect } from "auth0-js";
// import { useEffect } from "react";

// export default function Callback() {
//     const { isLoading, handleRedirectCallback } = useAuth0();

    
//     useEffect(() => {
//         const handleCallback = async () => {
//             console.log('Handling callback...');
//              // Remove the state parameter from the URL
//              if (window.location.search.includes('state')) {
//                 const urlWithoutState = window.location.href.replace(
//                     /([&?])state=[^&]+/,
//                     ''
//                 );
//                 window.history.replaceState(null, "", urlWithoutState);
//             }

//             try {
//                 await handleRedirectCallback();
//                 console.log('Callback handled successfully.');

//                 // Redirect to the desired page after successful authentication
//                 const targetUrl = '/buy';
//                 console.log(`Redirecting to ${targetUrl}...`);
//                 window.location.href = targetUrl;
//             } catch (error) {
//                 console.error('Error handling callback:', error);
//             }
//         };

//         handleCallback();
//     }, [handleRedirectCallback]);

//     return (
//         <div>
//             {isLoading ? (
//                 <div>Loading...</div>
//             ) : (
//                 <div>Redirecting you to the homepage...</div>
                
//             )}
//         </div>
//     );
// }