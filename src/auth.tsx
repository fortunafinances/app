import auth0 from 'auth0-js';
import { CgLaptop } from 'react-icons/cg';

const auth0Client = new auth0.WebAuth({
    domain: "dev-wpc8kymxzmepqxl5.us.auth0.com",
    clientID: "OxQxuofsPZXSFzTqbVtKgErT2xrl3VfZ",
    redirectUri: "http://localhost:4040/callback",
    responseType: 'token id_token',
    scope: 'openid email',
});

export function login() {
    auth0Client.authorize();
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
}