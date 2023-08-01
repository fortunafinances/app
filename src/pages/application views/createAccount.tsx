import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { currentAccountId, userInfo } from "../../utilities/reactiveVariables";
import { Account, User } from "../../utilities/types";
import {
	CREATE_ACCOUNT,
	GET_ACCOUNTS,
	GET_ACTIVITIES,
	GET_OVERVIEW,
	MAKE_TRANSFER,
} from "../../utilities/graphQL";
import * as Yup from "yup";

type ErrorType = {
	accountName?: string;
	bank?: string;
	accountNumber?: string;
	routingNumber?: string;
	amount?: number;
};

const POST_USER_INFO = gql`
	mutation InsertUser(
		$userId: ID!
		$onboardingComplete: Int
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

const SignupSchema = Yup.object().shape({
	amount: Yup.number()
		.min(0)
		// .moreThan(0, "Must be greater than 0")
		.when("transferType", {
			is: "IN",
			then: (schema) => schema.max(1_000_000, "Exceeded maximum deposit"),
		}),
});

type TransferReturnData = {
	insertTransfer: string;
};

export default function CreateAccount() {
	const navigate = useNavigate();
	const user = useReactiveVar(userInfo);
	const location = useLocation().state as { onboarding: boolean };

	const onboarding = location === null ? false : location.onboarding;

	const [postUserInfo] = useMutation<{ insertUser: { user: User } }>(
		POST_USER_INFO,
	);

	const [postAccount] = useMutation<{ insertAccount: { account: Account } }>(
		CREATE_ACCOUNT,
		{ refetchQueries: [{ query: GET_ACCOUNTS }] },
	);

	const [makeTransfer] = useMutation<TransferReturnData>(MAKE_TRANSFER, {
		refetchQueries: [{ query: GET_ACTIVITIES }, { query: GET_OVERVIEW }],
	});

	return (
		<div className="h-screen md:flex [&>section]:md:w-[50%]">
			<section className="hidden md:flex flex-col gap-5 bg-primary text-accent p-8 justify-center overflow-y-auto">
				<h1 className="font-semibold text-left md:text-8xl text-6xl">
					Create An Account
				</h1>
			</section>
			<section className="bg-accent p-4 text-primary h-full overflow-y-auto">
				<h1 className="text-3xl md:text-7xl">Account Information</h1>
				<hr className="h-[2px] my-2 md:my-8 bg-primary border-0"></hr>
				<div className="App">
					<center>
						<Formik
							initialValues={{
								accountName: "",
								bank: "",
								accountNumber: "",
								routingNumber: "",
								amount: 0,
							}}
							validationSchema={SignupSchema}
							onSubmit={(values, { setSubmitting }) => {
								postUserInfo({
									variables: {
										userId: user!.userId,
										onboardingComplete: 2,
										bankName: values.bank,
									},
								})
									.then(() => {
										postAccount({
											variables: {
												name: values.accountName.toLowerCase(),
												userId: user!.userId,
											},
										})
											.then((res) => {
												if (
													!res.data?.insertAccount
														.account
												)
													return;
												currentAccountId(
													Number(
														res.data?.insertAccount
															.account.accId,
													),
												);
												//do it here
												makeTransfer({
													variables: {
														sendAccId: 0,
														receiveAccId:
															currentAccountId(),
														transferAmt:
															values.amount,
													},
												}).catch((err) => {
													console.log(err);
												});
											})
											.catch((err) => {
												console.error(err);
											});
										navigate("/app");
									})
									.catch((err) => {
										console.log(err);
									})
									.finally(() => {
										setSubmitting(false);
									});
							}}
							validate={(values) => {
								const errors: ErrorType = {};
								if (!values.accountName) {
									errors.accountName = "*Required";
								}

								return errors;
							}}
						>
							{({ errors, isSubmitting }) => (
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
											className="pl-3 h-14 w-full rounded-md text-xl outline-info"
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
											className="pl-3 h-14 w-full rounded-md text-xl outline-info"
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
											className="pl-3 h-14 w-full rounded-md text-xl outline-info"
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
											className="pl-3 h-14 w-full rounded-md text-xl outline-info"
										/>
									</div>
									<div>
										<h1 className="text-left text-3xl font-medium pl-1">
											Transfer In
										</h1>

										{errors.amount && (
											<p className="text-[#FF0000] text-left">
												{errors.amount}
											</p>
										)}
										<div className="flex flex-row justify-center items-center">
											<h1 className="text-3xl pr-3">$</h1>
											<Field
												type="number"
												min="0"
												step="0.01"
												id="amount"
												name="amount"
												placeholder="Enter Amount..."
												className="pl-3 h-14 w-full rounded-md text-xl outline-info pr-3"
											/>
										</div>
									</div>
									<div className="flex flex-row justify-between">
										<button
											disabled={isSubmitting}
											onClick={() =>
												navigate("/createProfile")
											}
										>
											{onboarding && (
												<BsArrowLeft
													size={60}
													className="transition duration:500 hover:scale-125 hover:fill-[#7c1fff]"
												/>
											)}
										</button>
										<button
											type="submit"
											disabled={isSubmitting}
										>
											<BsArrowRight
												size={60}
												className="transition duration:500 hover:scale-125 hover:fill-[#7c1fff]"
											/>
										</button>
									</div>
								</Form>
							)}
						</Formik>
					</center>
				</div>
			</section>
		</div>
	);
}
