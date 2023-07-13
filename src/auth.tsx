import auth0 from 'auth0-js';

// WebAuth will redirect user to the login page
const auth0Client = new auth0.WebAuth({
    // feed in the data
    domain: "dev-wpc8kymxzmepqxl5.us.auth0.com",
    clientID: "OxQxuofsPZXSFzTqbVtKgErT2xrl3VfZ",
    redirectUri: "http://localhost:4040/callback",
    responseType: 'token id_token',
    scope: 'openid email', // what we want the token to include
});

export function login() {
    auth0Client.authorize();
}

export function signup() {
    auth0Client.authorize({ screen_hint: 'signup' });
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