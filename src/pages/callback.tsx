import { useEffect } from "react";
import { handleAuthentication } from "../utilities/auth";
import { gql, useLazyQuery, useMutation, useReactiveVar } from "@apollo/client";
import { Account } from "../utilities/types";
import {
	accounts,
	currentAccountId,
	userInfo,
} from "../utilities/reactiveVariables";
import { GET_ACCOUNTS } from "../utilities/graphQL";
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

type AccountQuery = {
	accounts: Account[];
};

const Callback = () => {
	const [getAccounts] = useLazyQuery<AccountQuery>(GET_ACCOUNTS);
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
						getAccounts({ variables: { userId: user!.userId } })
							.then((res) => {
								console.log(res);
								accounts(
									res.data?.accounts.map((acc) => {
										return {
											accId: Number(acc.accId),
											cash: acc.cash,
											name: acc.name,
										};
									})
								);
								currentAccountId(accounts()[0].accId);
							})
							.catch((err) => {
								console.error(err);
							});
						navigate("/app", { replace: true });
					}
				})
				.catch((err) => {
					console.error(err);
				});
		}, 2000);
	}, [getAccounts, getUser, navigate, user]);

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
