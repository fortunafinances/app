import { useAuth0 } from "@auth0/auth0-react";
import { login, handleAuthentication } from "../auth"
import { useEffect } from "react";



const SigninBtn = () => {
    useEffect(() => {
        handleAuthentication();
    }, []);

    const { loginWithRedirect } = useAuth0();

    return (

        < button className="btn btn-neutral text-white" 
                onClick={() => loginWithRedirect()}>
            Sign in
        </button >

    )
}

export default SigninBtn