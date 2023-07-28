import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../../utilities/reactiveVariables";
import { useEffect } from "react";
import { User } from "../../utilities/types";

type ErrorType = {
	firstName?: string;
	lastName?: string;
	username?: string;
	phoneNumber?: string;
};

const POST_USER_INFO = gql`
	mutation InsertUser(
		$userId: ID!
		$username: String!
		$firstName: String!
		$lastName: String!
		$phoneNumber: String!
	) {
		insertUser(
			userId: $userId
			username: $username
			firstName: $firstName
			lastName: $lastName
			phoneNumber: $phoneNumber
		) {
			message
			user {
				userId
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

export default function CreateProfile() {
	const navigate = useNavigate();

	const [postUserInfo] = useMutation<{ insertUser: { user: User } }>(
		POST_USER_INFO
	);

	const user = useReactiveVar(userInfo);
	useEffect(() => {
		if (!user) {
			navigate("/");
		}
	}, [user, navigate]);

	return (
		<div className="h-screen md:flex [&>section]:md:w-[50%]">
			<section className="md:flex hidden flex-col gap-5 bg-primary text-accent p-8">
				<h1 className="mt-[30%] font-semibold text-left md:text-8xl text-5xl">
					Welcome to Fortuna
				</h1>
				<h2 className=" inline-block text-4xl">
					Get better results with{" "}
					<p className="font-bold text-left inline-block text-accent bg-[#7C1FFF] px-2">
						Fortuna
					</p>{" "}
					at the helm of your portfolio
				</h2>
			</section>
			<section className="bg-accent p-4 text-primary h-full">
				<h1 className="text-3xl md:text-7xl">Create Profile</h1>
				<hr className="h-[2px] my-1 md:my-8 bg-primary border-0"></hr>
				<div className="App">
					<center>
						<Formik
							initialValues={{
								firstName: "",
								lastName: "",
								username: "",
								phoneNumber: "",
							}}
							onSubmit={(values, { setSubmitting }) => {
								postUserInfo({
									variables: {
										userId: user!.userId,
										username: values.username,
										firstName: values.firstName,
										lastName: values.lastName,
										phoneNumber: values.phoneNumber,
									},
								})
									.then((res) => {
										userInfo({
											username: values.username,
											firstName: values.firstName,
											lastName: values.lastName,
											phoneNumber: values.phoneNumber,
											picture:
												res.data?.insertUser.user
													.picture,
											...user!,
										});
										console.log(user);
										setSubmitting(false);
										navigate("/createAccount");
									})
									.catch((err) => {
										console.error(err);
									});
							}}
							validate={(values) => {
								const errors: ErrorType = {};
								if (!values.firstName) {
									errors.firstName = "*Required";
								}

								if (!values.lastName) {
									errors.lastName = "*Required";
								}
								if (!values.username) {
									errors.username = "*Required";
								}

								if (!values.phoneNumber) {
									errors.phoneNumber = "*Required";
								} else if (
									!/^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/i.test(
										values.phoneNumber,
									)
								) {
									errors.phoneNumber = "Invalid phone number";
								}
								return errors;
							}}
						>
							{({ isSubmitting }) => (
								<Form className="flex flex-col gap-4">
									<div>
										<label
											htmlFor="firstName"
											className="text-left text-3xl font-medium pl-1"
										>
											First Name
										</label>
										<ErrorMessage
											name="firstName"
											component="div"
											className="text-left text-[#FF0000]"
										/>
										<Field
											id="firstName"
											type="text"
											name="firstName"
											placeholder="First name"
											className="pl-3 h-14 w-full rounded-md text-xl outline-info"
										/>
									</div>
									<div>
										<label
											htmlFor="lastName"
											className="text-left text-3xl font-medium pl-1"
										>
											Last Name
										</label>
										<ErrorMessage
											name="lastName"
											component="div"
											className="text-left text-[#FF0000]"
										/>
										<Field
											id="lastName"
											type="text"
											name="lastName"
											placeholder="Last name"
											className="pl-3 h-14 w-full rounded-md text-xl outline-info"
										/>
									</div>
									<div>
										<label
											htmlFor="phoneNumber"
											className="text-left text-3xl font-medium pl-1"
										>
											Phone Number
										</label>
										<ErrorMessage
											name="phoneNumber"
											component="div"
											className="text-left text-[#FF0000]"
										/>
										<Field
											id="phoneNumber"
											type="phoneNumber"
											name="phoneNumber"
											placeholder="Phone number"
											className="pl-3 h-14 w-full rounded-md text-xl outline-info"
										/>
									</div>
									<div>
										<label className="text-left text-3xl font-medium pl-1">
											Username
										</label>
										<ErrorMessage
											name="username"
											component="div"
											className="text-left text-[#FF0000]"
										/>
										<Field
											id="username"
											type="username"
											name="username"
											placeholder="Username"
											className="pl-3 h-14 w-full rounded-md text-xl outline-info"
										/>
									</div>
									<button
										type="submit"
										disabled={isSubmitting}
										className="flex flex-row justify-end"
									>
										<BsArrowRight
											size={60}
											className="transition duration:500 hover:scale-125 hover:fill-[#7c1fff]"
										/>
									</button>
								</Form>
							)}
						</Formik>
					</center>
				</div>
			</section>
		</div>
	);
}
