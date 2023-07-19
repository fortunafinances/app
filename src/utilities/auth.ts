import auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';


interface DecodedToken {
    email: string;
    exp: number;
    name: string;
    profile: string;
    // add other claims as needed
}

// WebAuth will redirect user to the login page
const auth0Client = new auth0.WebAuth({
    // feed in the data
    domain: "dev-wpc8kymxzmepqxl5.us.auth0.com",
    clientID: "OxQxuofsPZXSFzTqbVtKgErT2xrl3VfZ",
    redirectUri: "http://localhost:4040/callback",
    responseType: 'token id_token',
    scope: 'openid email profile', // what we want the token to include
});

export function login() {
    auth0Client.authorize();
}

export function signup() {
    auth0Client.authorize({ screen_hint: 'signup' });
}

export function handleAuthentication() {
    let aToken;
    auth0Client.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
            // Save the tokens to local storage
            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);
            aToken = authResult.accessToken;
        } else if (err) {
            console.log(err);
        }
    });

    const token = localStorage.getItem('access_token');
    const itoken = localStorage.getItem('id_token');
    if (itoken) {
        const decodedToken = jwtDecode(itoken) as DecodedToken;

        console.log(`User email: ${decodedToken.email}`);
        console.log(`User name: ${decodedToken.name}`);
        console.log(`User profile: ${decodedToken.profile}`);
        if (decodedToken.exp < Date.now() / 1000) {
            console.log('Token has expired');
        } else {
            console.log('Token is still valid');
        }
    }


    fetch('http://127.0.0.1:5000/api/users', {

        headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        })
    })
        .then(response => response.json())
        .then(response => {
            console.log(response.status) // should output 200
        })
        .then(data => {
            console.log("handle the response data " + data)

        })
        .catch(error => {
            // handle the error
        });
    console.log("ACCESS TKN = " + token)
}