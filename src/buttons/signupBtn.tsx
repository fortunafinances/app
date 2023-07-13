import { signup } from "../auth"

const SignupBtn = () => {
  return (
    <button className="button__sign-up btn btn-neutral text-white" onClick={() => signup()}>
      Sign Up
    </button>
  );
};

export default SignupBtn;