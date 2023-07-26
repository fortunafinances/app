import { Field, Form, Formik, FormikHelpers } from "formik";
import FormikSelect from "../input/formikSelect";
import { userInfo } from "../../utilities/reactiveVariables";
import { Account } from "../../utilities/types";
import { useQuery } from "@apollo/client";
import { GET_ACCOUNTS } from "../../utilities/graphQL";
import * as Yup from "yup";

interface FormType {
	transferType: string;
	transferInAccount: string;
	transferOutAccount: string;
	toAccount: string;
	fromAccount: string;
	amount: string;
}

type DropdownProps = {
	label: string;
	value: string | number;
};

const transferType: DropdownProps[] = [
	{ label: "In", value: "IN" },
	{ label: "Out", value: "OUT" },
	{ label: "Between", value: "BETWEEN" },
];

const makeAccountList = (accounts: Account[]) => {
	const ret: DropdownProps[] = [];
	accounts.map((account) => {
		ret.push({ label: account.name, value: account.accId });
	});
	return ret;
};

const SignupSchema = Yup.object().shape({
	transferType: Yup.string().required("*Required"),
	transferInAccount: Yup.string().when("transferType", {
		is: "IN",
		then: (schema) => schema.required("*Required"),
	}),
	transferOutAccount: Yup.string().when("transferType", {
		is: "OUT",
		then: (schema) => schema.required("*Required"),
	}),
	toAccount: Yup.string().when("transferType", {
		is: "BETWEEN",
		then: (schema) => schema.required("*Required"),
	}),
	fromAccount: Yup.string().when("transferType", {
		is: "BETWEEN",
		then: (schema) => schema.required("*Required"),
	}),
	amount: Yup.number()
		.required("*Required")
		.moreThan(0, "Must be greater than 0"),
});

export default function NewTransfer() {
	const { loading, data } = useQuery<{ accounts: Account[] }>(GET_ACCOUNTS, {
		variables: { userId: userInfo()?.userId },
	});
	return (
		<dialog id="new_transfer_modal" className="modal">
			<Formik
				initialValues={{
					transferType: "",
					transferInAccount: "",
					transferOutAccount: "",
					toAccount: "",
					fromAccount: "",
					amount: "",
				}}
				validationSchema={SignupSchema}
				onSubmit={(
					values: FormType,
					{ setSubmitting, resetForm }: FormikHelpers<FormType>
				) => {
					console.log(values);
					resetForm();
					setSubmitting(false);
				}}
			>
				{({ values, errors, touched }) => (
					<Form className="modal-box bg-[#EDEDFE] flex flex-col gap-3 text-primary overflow-y-auto min-h-[40%]">
						<label htmlFor="transferType">Transfer Type</label>
						<FormikSelect
							id="transferType"
							selectOptions={transferType}
							formikFieldName="transferType"
							placeholder="Select..."
						/>
						{errors.transferType && touched.transferType && (
							<p className="text-red-600">{errors.transferType}</p>
						)}
						{loading ? (
							<span className="loading loading-dots loading-md" />
						) : values.transferType === "" ? (
							<></>
						) : values.transferType === "IN" ? (
							<div>
								<label htmlFor="transferInAccount">Destination Account</label>
								<FormikSelect
									id="transferInAccount"
									name="transferInAccount"
									key="transferInAccount"
									selectOptions={makeAccountList(data!.accounts)}
									formikFieldName="transferInAccount"
									placeholder="Select..."
								/>
								{errors.transferInAccount && touched.transferInAccount && (
									<p className="text-red-600">{errors.transferInAccount}</p>
								)}
							</div>
						) : values.transferType === "OUT" ? (
							<div>
								<label htmlFor="transferOutAccount">Source Account</label>
								<FormikSelect
									id="transferOutAccount"
									name="transferOutAccount"
									key="transferOutAccount"
									selectOptions={makeAccountList(data!.accounts)}
									formikFieldName="transferOutAccount"
									placeholder="Select..."
								/>
								{errors.transferOutAccount && touched.transferOutAccount && (
									<p className="text-red-600">{errors.transferOutAccount}</p>
								)}
							</div>
						) : (
							<div>
								<label htmlFor="toAccount">Destination Account</label>
								<FormikSelect
									id="toAccount"
									name="toAccount"
									key="toAccount"
									selectOptions={makeAccountList(data!.accounts)}
									formikFieldName="toAccount"
									placeholder="Select..."
								/>
								{errors.toAccount && touched.toAccount ? (
									<p className="text-red-600">{errors.toAccount}</p>
								) : null}
								<label htmlFor="fromAccount">Source Account</label>
								<FormikSelect
									id="fromAccount"
									name="fromAccount"
									key="fromAccount"
									selectOptions={makeAccountList(data!.accounts)}
									formikFieldName="fromAccount"
									placeholder="Select..."
								/>
								{errors.fromAccount && touched.fromAccount ? (
									<p className="text-red-600">{errors.fromAccount}</p>
								) : null}
							</div>
						)}
						<div className="flex flex-col">
							<label htmlFor="amount">Amount</label>
							<Field
								type="number"
								min="0"
								step="0.01"
								id="amount"
								name="amount"
								placeholder="Enter Amount..."
								className="p-2 rounded-md outline-secondary outline-1 outline focus:outline-blue-600 focus:outline-2 bg-white"
							/>
							{errors.amount && touched.amount ? (
								<p className="text-red-600">{errors.amount}</p>
							) : null}
						</div>

						{/* <div className="modal-action"> */}
						<button type="submit">Submit</button>
						{/* </div> */}
					</Form>
				)}
			</Formik>
		</dialog>
	);
}
