import { login } from "../auth"

const SigninBtn = () => {
    return (
        < button className="btn btn-neutral text-white"
            onClick={() => login()}>
            Sign in
        </button >
    )
}

export default SigninBtn