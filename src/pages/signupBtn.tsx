import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const SignupBtn = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <button className="button__sign-up btn btn-neutral text-white" onClick={handleSignUp}>
      Sign Up
    </button>
  );
};

export default SignupBtn;