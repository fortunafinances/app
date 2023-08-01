import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../utilities/reactiveVariables";
import { useEffect } from "react";
import { User } from "../utilities/types";
import { capitalize } from "../utilities/common";
import * as Yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


const validationSchema = Yup.object().shape({
	firstName: Yup.string().required("*Required"),
	lastName: Yup.string().required("*Required"),
	username: Yup.string().required("*Required").min(3, "Username must be at least 3 characters long").max(20, "Username must be less than 20 characters long"),
	phoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not valid").required("*Required"),
});

const POST_USER_INFO = gql`
	mutation InsertUser(
		$userId: ID!
		$username: String
		$firstName: String
		$lastName: String
		$phoneNumber: String
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
				<center className="">
					<Formik
						initialValues={{
							firstName: capitalize(user!.firstName) ?? "",
							lastName: capitalize(user!.lastName) ?? "",
							username: capitalize(user!.username) ?? "",
							phoneNumber: capitalize(user!.phoneNumber) ?? "",
						}}
						onSubmit={(values, { setSubmitting }) => {
							postUserInfo({
								variables: {
									userId: user!.userId,
									username: values.username,
									firstName: values.firstName.toLowerCase(),
									lastName: values.lastName.toLowerCase(),
									phoneNumber: values.phoneNumber.replace(/\D/g, ""),
									onboardingComplete: 1
								},
							})
								.then((res) => {
									console.log("setting user info")
									userInfo({
										userId: user!.userId,
										email: user!.email,
										username: values.username,
										firstName: values.firstName.toLowerCase(),
										lastName: values.lastName.toLowerCase(),
										phoneNumber: values.phoneNumber.replace(/\D/g, ""),
										picture:
											res.data?.insertUser.user
												.picture,
									});
									navigate("/createAccount", { state: { onboarding: true } });
								})
								.catch((err) => {
									console.error(err);
								}).finally(() => {
									console.log(userInfo())
									setSubmitting(false);
								});
						}}
						validationSchema={validationSchema}
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
			</section>
		</div>
	);
}
