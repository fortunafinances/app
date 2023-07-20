import auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';
import { userId } from "./reactiveVariables";

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
	userId(null);
	localStorage.removeItem("id_token");
	localStorage.removeItem("access_token");
	auth0Client.logout({
		returnTo: "http://localhost:4040/",
		clientID: "OxQxuofsPZXSFzTqbVtKgErT2xrl3VfZ",
	});
	console.log("Sign out");
}

export async function handleAuthentication() {
	auth0Client.parseHash((err, authResult) => {
		if (authResult && authResult.accessToken && authResult.idToken) {
			// Save the tokens to local storage
			localStorage.setItem("access_token", authResult.accessToken);
			localStorage.setItem("id_token", authResult.idToken);
		} else if (err) {
			console.log(err);
		}
	});

	const atoken = localStorage.getItem("access_token");
	const itoken = localStorage.getItem("id_token");

	//just to check the info in itoken
	printDecodedToken(itoken!);

	// send access token to backend
	fetchApiFromBackend(atoken!, "userinfo");

	const sub = localStorage.getItem("sub");
	await sendUserData(sub!);
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
			localStorage.setItem("sub", res.sub);

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
	return fetch(`http://localhost:5000/addUser`, {
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


