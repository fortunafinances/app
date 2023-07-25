import { gql, useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

type ErrorType = {
	firstname?: string;
	lastname?: string;
	username?: string;
	phonenumber?: string;
};

export default function CreateProfile() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user");
	if (!user) {
		navigate("/");
	}

  const routeChange = () => {
    const path = `/createAccount`;
    navigate(path);
  };
  return (
		<div className="h-screen flex [&>section]:w-[50%]">
			<section className="flex flex-col gap-5 bg-primary text-secondary p-8">
				<h1 className=" mt-[30%] font-semibold text-left md:text-8xl text-5xl">
					Welcome to Fortuna
				</h1>
				<h2 className=" inline-block text-4xl">
					Get better results with{" "}
					<p className="font-bold text-left inline-block text-black bg-secondary px-2">
						Fortuna
					</p>{" "}
					at the helm of your portfolio
				</h2>
			</section>
			<section className="bg-secondary p-4 text-primary">
				<h1 className="text-7xl">Create Profile</h1>
				<hr className="h-[2px] my-8 bg-primary border-0"></hr>
				<div className="App">
					<center>
						<Formik
							initialValues={{
								firstname: "",
								lastname: "",
								email: "",
								phonenumber: "",
								birthdate: "",
							}}
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(() => {
									alert(JSON.stringify(values, null, 2));
									setSubmitting(false);
								}, 400);
							}}
							validate={(values) => {
								const errors: ErrorType = {};
								if (!values.firstname) {
									errors.firstname = "*Required";
								}

								if (!values.lastName) {
									errors.lastName = "*Required";
								}

								if (!values.email) {
									errors.email = "*Required";
								} else if (
									!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
								) {
									errors.email = "Invalid email address";
								}
								if (!values.username) {
									errors.username = "*Required";
								}

								if (!values.phonenumber) {
									errors.phonenumber = "*Required";
								} else if (
									!/^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/i.test(
										values.phonenumber
									)
								) {
									errors.phonenumber = "Invalid phone number";
								}
								return errors;
							}}
						>
							{({ isSubmitting }) => (
								<Form className="flex flex-col gap-4">
									<div>
										<h1 className="text-left text-3xl font-medium pl-1">
											First Name
										</h1>
										<ErrorMessage
											name="firstname"
											component="div"
											className="text-left text-[#FF0000]"
										/>
										<Field
											type="text"
											name="firstname"
											placeholder="First name"
											className="pl-3 h-14 w-full rounded-md text-xl"
										/>
									</div>
									<div>
										<h1 className="text-left text-3xl font-medium pl-1">
											Last Name
										</h1>
										<ErrorMessage
											name="lastname"
											component="div"
											className="text-left text-[#FF0000]"
										/>
										<Field
											type="text"
											name="lastname"
											placeholder="Last name"
											className="pl-3 h-14 w-full rounded-md text-xl"
										/>
									</div>
									<div>
										<h1 className="text-left text-3xl font-medium pl-1">
											Email
										</h1>
										<ErrorMessage
											name="email"
											component="div"
											className="text-left text-[#FF0000]"
										/>
										<Field
											type="email"
											name="email"
											placeholder="Email Address"
											className="pl-3 h-14 w-full rounded-md text-xl"
										/>
									</div>
									<div>
										<h1 className="text-left text-3xl font-medium pl-1">
											Phone Number
										</h1>
										<ErrorMessage
											name="phonenumber"
											component="div"
											className="text-left text-[#FF0000]"
										/>
										<Field
											type="phonenumber"
											name="phonenumber"
											placeholder="Phone number"
											className="pl-3 h-14 w-full rounded-md text-xl"
										/>
									</div>
									<div>
										<h1 className="text-left text-3xl font-medium pl-1">
											Username
										</h1>
										<ErrorMessage
											name="username"
											component="div"
											className="text-left text-[#FF0000]"
										/>
										<Field
											type="username"
											name="username"
											placeholder="Username"
											className="pl-3 h-14 w-full rounded-md text-xl"
										/>
									</div>
									<button
										type="submit"
										disabled={isSubmitting}
										className="flex flex-row justify-end"
										onClick={routeChange}
									>
										<BsArrowRight
											size={60}
											className="transition duration:500 hover:scale-125"
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
