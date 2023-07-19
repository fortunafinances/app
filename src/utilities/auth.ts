import auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';

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
    audience:
        "http://127.0.0.1:5000/",
    redirectUri: "http://localhost:4040/callback",
    responseType: 'token id_token',
    scope: 'openid email sub nickname profile offline_access read:user', // what we want the token to include
});

export function login() {
	auth0Client.authorize();
}

export function signup() {
    auth0Client.authorize({ screen_hint: 'signup' });
}
export function signout() {
    auth0Client.logout({
        returnTo: "http://localhost:4040/",
        clientID: "OxQxuofsPZXSFzTqbVtKgErT2xrl3VfZ"
    });
    console.log("Sign out")
}

export function handleAuthentication() {
    auth0Client.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
            // Save the tokens to local storage
            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);
        } else if (err) {
            console.log(err);
        }
    });

    const atoken = localStorage.getItem('access_token');
    const itoken = localStorage.getItem('id_token');

    printDecodedToken(itoken); //just to check the info in itoken

    // send access token to backend
    fetchApiFromBackend(atoken, "api/private");

    console.log("ACCESS TKN = " + atoken)
}

// function that send the token to the backend,
// ask for permission to access a specific endpoint
function fetchApiFromBackend(token, endpoint) {
    // https://dev-wpc8kymxzmepqxl5.us.auth0.com
    // http://127.0.0.1:5000
    fetch(`http://127.0.0.1:5000/${endpoint}`, {

        headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          })
    })
        .then(response => response.json())
        .then(response => {
            console.log("Response from the api", response)
            console.log(response.status) // should output 200
        })
        .then(data => {
            console.log("handle the response data" + data)
            
        })
        .catch(error => {
            console.log("error in fetching --- " + error)
        });
    console.log("ACCESS TKN = " + token)
}

/** function that will print out the info id token contains */
function printDecodedToken(token) {
    if (token) {
        const decodedToken = jwtDecode(token) as DecodedToken;

        console.log(`\nUser email: ${decodedToken.email}`);
        console.log(`User nickname: ${decodedToken.nickname}`);
        console.log(`User sub: ${decodedToken.sub}`);
        if (decodedToken.exp < Date.now() / 1000) {
            console.log('Token has expired');
        } else {
            console.log('Token is still valid');
        }
    }
}