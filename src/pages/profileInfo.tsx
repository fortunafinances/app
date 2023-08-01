import { gql, useMutation } from "@apollo/client";
// import { error } from "console";
import EdiText from "react-editext";
import { User } from "../utilities/types";

export default function ProfileInfo() {
	function createField(prop: string | undefined) {
		return (
			<EdiText
				className="w-full"
				type="text"
				value={prop === undefined ? "" : prop}
				onSave={handleSave}
				validation={(val) => val !== ""}
				onValidationFail={validationFailed}
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
				userID: $userID
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

	const lindsay = "lindsay";

	const handleSave = () => {
		insertUser({
			variables: {
				// username: data?.insertUser.user.username,
				firstName: lindsay,
				lastName: lindsay,
				email: lindsay,
				phoneNumber: lindsay,
				bankName: lindsay,
			},
		})
			// .then((data) => data.data?.insertUser.lastName)
			.catch((error) => console.error(error));
	};

	// const onSave = (val: string) => {
	//   console.log("Edited Value -> ", val);
	// };
	const validationFailed = () => {
		alert("Validation Failed: Please fill out all forms.");
	};

	if (loading) return <>Loading</>;
	if (error) return <p>{error.message}</p>;

	return (
		<div className="h-screen flex">
			<div className="bg-primary w-[50%] h-full flex flex-col gap-9 justify-center">
				<div className="text-secondary text-4xl md:text-6xl xl:text-8xl items-center  ml-[5%] font-medium">
					<h1>Hello,</h1>
					<h1 className="bg-info px-2 w-fit">{}</h1>
				</div>
				<h2 className="ml-[5%] text-info text-5xl">Edit Profile</h2>
			</div>
			<div className="w-[50%] overflow-y-auto flex-col p-6 bg-accent text-primary [&>h3]:text-2xl [&>h3]:py-2 [&>h2]:text-5xl [&>h2]:py-4">
				<h1 className="text-8xl">Profile</h1>
				<hr className="h-[2px] my-8 bg-primary border-0"></hr>
				<h2>Personal Information</h2>
				<h3>First Name</h3>
				{createField(data?.insertUser.user.firstName)}
				<h3>Last Name</h3>
				{createField(data?.insertUser.user.lastName)}
				<h3>Email</h3>
				{createField(data?.insertUser.user.email)}
				<h3>Phone Number</h3>
				{createField(data?.insertUser.user.phoneNumber)}

				<h2 className="py-4">Bank Information</h2>
				<h3>Bank</h3>
				{createField(data?.insertUser.user.bankName)}

				<h2>Accounts</h2>
				<h3>Account 1</h3>
				<h3>Account 2</h3>
			</div>
		</div>
	);
}
