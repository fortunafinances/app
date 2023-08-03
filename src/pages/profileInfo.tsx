import { gql, useMutation, useReactiveVar } from "@apollo/client";
// import { error } from "console";
import EdiText from "react-editext";
import { User } from "../utilities/types";
import { useEffect } from "react";
import { BsCheckLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../utilities/reactiveVariables";

export default function ProfileInfo() {
	const navigate = useNavigate();
	const user = useReactiveVar(userInfo);

	const handleSave = (newVal: string, fieldName: string) => {

		insertUser({
			variables: {
				// username: data?.insertUser.user.username,
				userId: data?.insertUser.user.userId,
				firstName:
					fieldName === "firstName"
						? newVal
						: data?.insertUser.user.firstName,
				lastName:
					fieldName === "lastName"
						? newVal
						: data?.insertUser.user.lastName,
				email:
					fieldName === "email"
						? newVal
						: data?.insertUser.user.email,
				phoneNumber:
					fieldName === "phoneNumber"
						? newVal
						: data?.insertUser.user.phoneNumber,
				bankName:
					fieldName === "bankName"
						? newVal
						: data?.insertUser.user.bankName,
				username:
					fieldName === "username"
						? newVal
						: data?.insertUser.user.username,
			},
		})
			// .then((data) => data.data?.insertUser.lastName)
			.catch((error) => console.error(error));
	};
	const handleValidation = (newVal: string, fieldName: string) => {
		if (fieldName === "phoneNumber") {
			return /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/i.test(
				newVal,
			);
		} else if (newVal !== "" && typeof newVal === "string") {
			return true;
		}
		return false;
	};

	function createField(label: string, name: string | undefined) {
		return (
			<EdiText
				className="w-full"
				type="text"
				value={name === undefined ? "" : name}
				onSave={(newVal: string) => handleSave(newVal, label)}
				validation={(newVal: string) => handleValidation(newVal, label)}
				onValidationFail={(newVal: string) =>
					validationFailed(newVal, label)
				}
				inputProps={{ style: { borderColor: "#7c1fff" } }}
				containerProps={{
					style: {
						backgroundColor: "white",
						borderRadius: 3,
					},
				}}
				editButtonProps={{
					style: {
						backgroundColor: "",
						borderRadius: 3,
						borderColor: "white",
					},
				}}
				viewProps={{
					style: {
						backgroundColor: "white",
						borderRadius: 3,
						padding: 8,
						width: "100%",
						fontSize: "20px",
					},
				}}
			/>
		);
	}

	const PROFILE_INFO = gql`
		mutation InsertUser(
			$userId: ID!
			$username: String
			$firstName: String
			$lastName: String
			$email: String
			$phoneNumber: String
			$bankName: String
		) {
			insertUser(
				userId: $userId
				username: $username
				firstName: $firstName
				lastName: $lastName
				email: $email
				phoneNumber: $phoneNumber
				bankName: $bankName
			) {
				user {
					userId
					username
					firstName
					lastName
					email
					phoneNumber
					picture
					bankName
					registerDate
				}
			}
		}
	`;

	type TransferReturnData = {
		insertUser: {
			user: User;
		};
	};

	const [insertUser, { loading, error, data }] =
		useMutation<TransferReturnData>(PROFILE_INFO);

	const validationFailed = (newVal: string, fieldName: string) => {
		let errorType = "";
		if (fieldName == "phoneNumber") {
			errorType = "PHONE NUMBER";
		} else if (fieldName == "firstName") {
			errorType = "PHONE NUMBER";
		} else if (fieldName == "lastName") {
			errorType = "LAST NAME";
		} else if (fieldName == "email") {
			errorType = "EMAIL";
		} else if (fieldName == "bank") {
			errorType = "BANK";
		} else if (fieldName == "username") {
			errorType = "USERNAME";
		}
		alert("Validation Failed: Invalid " + errorType + " input: " + newVal);
	};

	useEffect(() => {
		insertUser({
			variables: {
				userId: user?.userId,
			},
		}).catch((err) => console.error(err));
	}, [insertUser, user?.userId]);

	if (loading) return <>Loading</>;
	if (error) return <p>{error.message}</p>;

	return (
		<div className="h-screen flex">
			<div className="bg-primary w-[50%] h-full flex flex-col gap-9 justify-center">
				<div className="text-secondary text-4xl  md:text-6xl xl:text-9xl items-left  ml-[5%] font-medium md:flex-row sm:flex-col">
					<h1 className="">Hello,</h1>
					<h1 className="bg-info px-2 w-fit">
						{data?.insertUser.user.firstName}
					</h1>
				</div>
				<h2 className="ml-[5%] text-info text-5xl">Edit Profile</h2>
			</div>
			<div className="w-[50%] overflow-y-auto flex-col p-6 bg-accent text-primary [&>h3]:text-2xl [&>h3]:py-2 [&>h2]:text-5xl [&>h2]:py-4 ">
				<h1 className="text-8xl">Profile</h1>
				<hr className="h-[2px] mt-8 bg-primary border-0"></hr>
				<h2>Personal Information</h2>
				<h3>First Name</h3>
				{createField("firstName", data?.insertUser.user.firstName)}
				<h3>Last Name</h3>
				{createField("lastName", data?.insertUser.user.lastName)}
				<h3>Username</h3>
				{createField("username", data?.insertUser.user.username)}
				<h3>Email</h3>
				{createField("email", data?.insertUser.user.email)}
				<h3>Phone Number</h3>
				{createField("phoneNumber", data?.insertUser.user.phoneNumber)}
				<h2 className="py-4">Bank Information</h2>
				<h3>Bank</h3>
				{createField("bankName", data?.insertUser.user.bankName)}
				<div className="p-3 flex flex-row justify-end">
					<BsCheckLg
						size={60}
						className="transition duration:500 hover:scale-125 hover:fill-[#7c1fff]"
						onClick={() => navigate("/app/overview")}
					/>
				</div>
			</div>
		</div>
	);
}
