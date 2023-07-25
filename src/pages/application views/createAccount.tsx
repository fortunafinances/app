import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {
	accounts,
	currentAccountId,
	userInfo,
} from "../../utilities/reactiveVariables";
import { Account, User } from "../../utilities/types";
import { CREATE_ACCOUNT } from "../../utilities/graphQL";

type ErrorType = {
	accountName?: string;
	bank?: string;
	accountNumber?: string;
	routingNumber?: string;
};

const POST_USER_INFO = gql`
	mutation InsertUser(
		$userId: ID!
		$onboardingComplete: Boolean
		$bankName: String
	) {
		insertUser(
			userId: $userId
			onboardingComplete: $onboardingComplete
			bankName: $bankName
		) {
			message
			user {
				onboardingComplete
				userId
				username
				firstName
				lastName
				email
				phoneNumber
			}
		}
	}
`;

export default function CreateAccount() {
	const navigate = useNavigate();
	const user = useReactiveVar(userInfo);

	const [postUserInfo] = useMutation<{ insertUser: { user: User } }>(
		POST_USER_INFO
	);

	const [postAccount] = useMutation<{ insertAccount: { account: Account } }>(
		CREATE_ACCOUNT
	);

	return (
		<div className="h-screen flex [&>div]:w-[50%]">
			<div className="flex flex-col gap-5 bg-primary text-secondary p-8">
				<h1 className=" mt-[30%] font-semibold text-left md:text-8xl text-5xl">
					Create An Account
				</h1>
				{/* <h2 className=" inline-block text-4xl">
          Get better results with{" "}
          <p className="font-bold text-left inline-block text-black bg-secondary px-2">
            Fortuna
          </p>{" "}
          at the helm of your portfolio
        </h2> */}
			</div>
			<div className="bg-secondary p-4 text-primary">
				<h1 className="text-7xl">Account Information</h1>
				<hr className="h-[2px] my-8 bg-primary border-0"></hr>
				<div className="App">
					<center>
						<Formik
							initialValues={{
								accountName: "",
								bank: "",
								accountNumber: "",
								routingNumber: "",
							}}
							onSubmit={(values, { setSubmitting }) => {
								postUserInfo({
									variables: {
										userId: user!.userId,
										onboardingComplete: true,
										bankName: values.bank,
									},
								})
									.then(() => {
										setSubmitting(false);
										postAccount({
											variables: {
												name: values.accountName,
												userId: user!.userId,
											},
										})
											.then((res) => {
												if (!res.data?.insertAccount.account) return;
												accounts([res.data?.insertAccount.account]);
												currentAccountId(res.data?.insertAccount.account.accId);
												console.log(
													"new acct: ",
													res.data?.insertAccount.account
												);
											})
											.catch((err) => {
												console.error(err);
											});
										navigate("/app");
									})
									.catch((err) => {
										console.log(err);
									});
							}}
							validate={(values) => {
								const errors: ErrorType = {};
								if (!values.accountName) {
									errors.accountName = "*Required";
								}

								// if (!values.bank) {
								//   errors.bank = "*Required";
								// }

								// if (!values.accountNumber) {
								//   errors.accountNumber = "*Required";
								// }

								// if (!values.routingNumber) {
								//   errors.routingNumber = "*Required";
								// }

								return errors;
							}}
						>
							{({ isSubmitting }) => (
								<Form className="flex flex-col gap-4 ">
									<div>
										<h1 className="text-left text-3xl font-medium pl-1">
											Account Name
										</h1>
										<ErrorMessage
											name="accountName"
											component="div"
											className="text-left text-[#FF0000]"
										/>
										<Field
											type="text"
											name="accountName"
											placeholder="Account Name"
											className="pl-3 h-14 w-full rounded-md text-xl"
										/>
									</div>
									<div>
										<h1 className="text-left text-3xl font-medium pl-1">
											Bank
										</h1>
										<ErrorMessage
											name="bank"
											component="div"
											className="text-left text-[#FF0000]"
										/>
										<Field
											type="text"
											name="bank"
											placeholder="Bank"
											className="pl-3 h-14 w-full rounded-md text-xl"
										/>
									</div>
									<div>
										<h1 className="text-left text-3xl font-medium pl-1">
											Account Number
										</h1>
										<ErrorMessage
											name="accountNumber"
											component="div"
											className="text-left text-[#FF0000]"
										/>
										<Field
											type="accountNumber"
											name="accountNumber"
											placeholder="Account Number"
											className="pl-3 h-14 w-full rounded-md text-xl"
										/>
									</div>
									<div>
										<h1 className="text-left text-3xl font-medium pl-1">
											Routing Number
										</h1>
										<ErrorMessage
											name="routingNumber"
											component="div"
											className="text-left text-[#FF0000]"
										/>
										<Field
											type="routingNumber"
											name="routingNumber"
											placeholder="Routing Number"
											className="pl-3 h-14 w-full rounded-md text-xl"
										/>
									</div>
									<div className="flex flex-row justify-between">
										<button
											disabled={isSubmitting}
											onClick={() => navigate("/createProfile")}
										>
											<BsArrowLeft
												size={60}
												className="transition duration:500 hover:scale-125"
											/>
										</button>
										<button type="submit" disabled={isSubmitting}>
											<BsArrowRight
												size={60}
												className="transition duration:500 hover:scale-125"
											/>
										</button>
									</div>
								</Form>
							)}
						</Formik>
					</center>
				</div>
			</div>
		</div>
	);
}
