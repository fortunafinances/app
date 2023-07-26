import { useEffect } from "react";
import { handleAuthentication } from "../utilities/auth";
import { gql, useMutation, useReactiveVar } from "@apollo/client";
import {
	userInfo,
} from "../utilities/reactiveVariables";
import { useNavigate } from "react-router-dom";

const GET_USER = gql`
	mutation InsertUser($userId: ID!, $email: String!) {
		insertUser(userId: $userId, email: $email) {
			message
			user {
				userId
				onboardingComplete
				username
				firstName
				lastName
				email
				phoneNumber
				picture
			}
		}
	}
`;

type UserQuery = {
	insertUser: {
		user: {
			userId: string;
			onboardingComplete: boolean;
			username?: string;
			firstName?: string;
			lastName?: string;
			email?: string;
			phoneNumber?: string;
			picture?: string;
		};
	};
};

const Callback = () => {
	const navigate = useNavigate();
	const [getUser] = useMutation<UserQuery>(GET_USER);

	const user = useReactiveVar(userInfo);

	useEffect(() => {
		// Handle the callback logic here
		// e.g., retrieve user information, set up user session
		handleAuthentication();

		setTimeout(() => {
			// Get user data
			getUser({
				variables: {
					userId: user!.userId,
					email: user!.email,
				},
			})
				.then((res) => {
					if (!res.data?.insertUser.user.onboardingComplete) {
						// If user has not completed onboarding, navigate to onboarding
						navigate("/createProfile", { replace: true });
					} else {
						// If user has completed onboarding, navigate to dashboard and populate user info
						userInfo({
							username: res.data?.insertUser.user.username,
							firstName: res.data?.insertUser.user.firstName,
							lastName: res.data?.insertUser.user.lastName,
							...user!,
						});
						navigate("/app", { replace: true });
					}
				})
				.catch((err) => {
					console.error(err);
				});
		}, 2000);
	}, [getUser, navigate, user]);

	return (
		<div className="w-screen h-screen">
			<div className="flex flex-col absolute-center items-center w-full text-center">
				<div className="text-4xl">Redirecting...</div>
				<span className="loading loading-dots loading-lg" />
			</div>
		</div>
	);
};

export default Callback;
