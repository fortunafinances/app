/* eslint-disable @typescript-eslint/no-unused-vars */
import auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';
import { userInfo } from "./reactiveVariables";

interface DecodedToken {
	openid: string;
	email: string;
	sub: string;
	nickname: string;
	profile: string;
	exp: number;
	// add other claims as needed
}

// WebAuth will redirect user to the login page
const auth0Client = new auth0.WebAuth({
	// feed in the data
	// https://dev-wpc8kymxzmepqxl5.us.auth0.com/api/v2/
	domain: "dev-wpc8kymxzmepqxl5.us.auth0.com",
	clientID: "OxQxuofsPZXSFzTqbVtKgErT2xrl3VfZ",
	audience: "http://127.0.0.1:5000/",
	redirectUri: "http://localhost:4040/callback",
	responseType: "token id_token",
	scope: "openid email sub nickname profile offline_access read:user", // what we want the token to include
});

export function login() {
	auth0Client.authorize();
}

export function signup() {
	auth0Client.authorize({ screen_hint: "signup" });
}

export function signout() {
	localStorage.clear();
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
				function (err, userData) {
					console.log("\nUser info... ", userData);
					console.log("\nUser id... ", userData.sub);
					localStorage.setItem("userId", userData.sub);
					userInfo({
						userId: userData.sub,
						username: userData.name,
						nickname: userData.nickname,
						email: userData.email!,
						picture: userData.picture,
						dateOfBirth: "1/1/2000",
					});
				}
			);
		} else if (err) {
			console.log(err);
		}
	});

	// const aToken = localStorage.getItem("access_token");
	// const iToken = localStorage.getItem("id_token");

	/** This function is to print out the contents inside id token,
	 * uncomment to test it, and check the console
	 */
	// printDecodedToken(iToken!);

	// send access token to backend
	// fetchApiFromBackend(aToken!, "userinfo");

	// await sendUserData(sub!);
}

// function that send the token to the backend,
// ask for permission to access a specific endpoint
function fetchApiFromBackend(token: string, endpoint: string) {
	// https://dev-wpc8kymxzmepqxl5.us.auth0.com
	// http://127.0.0.1:5000
	fetch(`https://dev-wpc8kymxzmepqxl5.us.auth0.com/${endpoint}`, {
		headers: new Headers({
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		}),
	})
		.then((response) => response.json())
		.then((response) => {
			const res = response as Response & { sub: string };
			console.log("Response from the api", response);
			console.log(res.sub);

			// store sub to local storage
			localStorage.setItem("userId", res.sub);

			// should output 200
			console.log(res.status);
		})
		.catch((error) => {
			console.log("error in fetching --- " + error);
		});
	console.log("\nACCESS TOKEN = " + token);
}

// sending user data to backend (aka sub)
function sendUserData(data: string) {
	return fetch(`http://localhost:5000/add_user`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((response) => {
			console.log("Sending data to backend... ", response);
		})
		.catch((error) => console.log(error));
}

/** function that will print out the info id token contains */
function printDecodedToken(token: string) {
	if (token) {
		const decodedToken: DecodedToken = jwtDecode(token);

		console.log(`\nUser email: ${decodedToken.email}`);
		console.log(`User nickname: ${decodedToken.nickname}`);
		console.log(`User sub: ${decodedToken.sub}`);
		if (decodedToken.exp < Date.now() / 1000) {
			console.log("Token has expired");
		} else {
			console.log("Token is still valid");
		}
	}
}


