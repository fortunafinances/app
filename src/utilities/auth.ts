import auth0 from 'auth0-js';
import { userInfo } from "./reactiveVariables";

// WebAuth will redirect user to the login page
const auth0Client = new auth0.WebAuth({
	// feed in the data
	// https://dev-wpc8kymxzmepqxl5.us.auth0.com/api/v2/
	domain: "dev-wpc8kymxzmepqxl5.us.auth0.com",
	clientID: "OxQxuofsPZXSFzTqbVtKgErT2xrl3VfZ",
	audience: "http://127.0.0.1:5000/",
	redirectUri: import.meta.env.DEV ? "http://localhost:4040/callback" : "https://fortunafinances.com/callback",
	responseType: "token id_token",
	scope: "openid email sub nickname profile read:user", // what we want the token to include
});

export function login() {
	auth0Client.authorize();
}

export function signup() {
	auth0Client.authorize({ screen_hint: "signup" });
}

export function signout() {
	localStorage.removeItem("access_token");
	localStorage.removeItem("id_token");
	localStorage.removeItem("user");
	localStorage.removeItem("accounts");
	localStorage.removeItem("currentAccountId");
	auth0Client.logout({
		returnTo: import.meta.env.DEV ? "http://localhost:4040/" : "https://fortunafinances.com/",
		clientID: "OxQxuofsPZXSFzTqbVtKgErT2xrl3VfZ",
	});
}

export function handleAuthentication() {
	auth0Client.parseHash((err, authResult) => {
		if (authResult && authResult.accessToken && authResult.idToken) {
			// Save the tokens to local storage
			localStorage.setItem("access_token", authResult.accessToken);
			localStorage.setItem("id_token", authResult.idToken);

			// This method will make a request to the /userinfo endpoint
			// and return the user object, which contains the user's information,
			// similar to the response below.
			auth0Client.client.userInfo(
				authResult.accessToken,
				function (_err, userData) {
					userInfo({
						userId: userData.sub,
						email: userData.email!,
						picture: userData.picture,
					});
				}
			);
		} else if (err) {
			console.error(err);
		}
	});
}