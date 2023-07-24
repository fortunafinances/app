import auth0 from 'auth0-js';
// import jwtDecode from 'jwt-decode';
import { userInfo } from "./reactiveVariables";

// interface DecodedToken {
// 	openid: string;
// 	email: string;
// 	sub: string;
// 	nickname: string;
// 	profile: string;
// 	exp: number;
// 	// add other claims as needed
// }

// WebAuth will redirect user to the login page
const auth0Client = new auth0.WebAuth({
	// feed in the data
	// https://dev-wpc8kymxzmepqxl5.us.auth0.com/api/v2/
	domain: "dev-wpc8kymxzmepqxl5.us.auth0.com",
	clientID: "OxQxuofsPZXSFzTqbVtKgErT2xrl3VfZ",
	audience: "http://127.0.0.1:5000/",
	redirectUri: "http://localhost:4040/callback",
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
	auth0Client.logout({
		returnTo: "http://localhost:4040/",
		clientID: "OxQxuofsPZXSFzTqbVtKgErT2xrl3VfZ",
	});
	console.log("Sign out");
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
					console.log("\nUser info... ", userData);
					console.log("\nUser id... ", userData.sub);
					userInfo({
						userId: userData.sub,
						username: userData.name,
						nickname: userData.nickname,
						email: userData.email!,
						picture: userData.picture,
						dateOfBirth: "",
					});
				}
			);
		} else if (err) {
			console.log("Error in handle auth: ", err);
		}
	});
}

/** sending user data to backend */
// function sendUserData(data: string) {
// 	return fetch(`http://localhost:5000/add_user`, {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(data),
// 	})
// 		.then((response) => response.json())
// 		.then((response) => {
// 			console.log("Sending data to backend... ", response);
// 		})
// 		.catch((error) => console.log(error));
// }

// /** function that will print out the info id token contains */
// function printDecodedToken(token: string) {
// 	if (token) {
// 		const decodedToken: DecodedToken = jwtDecode(token);

// 		console.log(`\nUser email: ${decodedToken.email}`);
// 		console.log(`User nickname: ${decodedToken.nickname}`);
//         localStorage.setItem("---- user", decodedToken.nickname);
// 		console.log(`User sub: ${decodedToken.sub}`);
// 		if (decodedToken.exp < Date.now() / 1000) {
// 			console.log("Token has expired");
// 		} else {
// 			console.log("Token is still valid");
// 		}
// 	}
// }


