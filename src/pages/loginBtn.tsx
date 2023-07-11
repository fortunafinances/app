import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginBtn = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (

        !isAuthenticated && (
        < button className="btn btn-neutral text-white" onClick={() => loginWithRedirect()}>
                Sign in
            </button >

            )     
    )
}

export default LoginBtn