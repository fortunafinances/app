import { Field, Form, Formik, FormikHelpers } from "formik";
import FormikSelect from "../input/formikSelect";

interface FormType {
	transferType: string;
	toAccount: string;
	fromAccount: string;
	amount: number;
}

type DropdownProps = {
	label: string;
	value: string;
};

const transferType: DropdownProps[] = [
	{ label: "In", value: "IN" },
	{ label: "Out", value: "OUT" },
	{ label: "Between", value: "BETWEEN" },
];

export default function NewTransfer() {
	return (
		<dialog id="new_transfer_modal" className="modal">
			<Formik
				initialValues={{
					transferType: "",
					toAccount: "",
					fromAccount: "",
					amount: 0,
				}}
				onSubmit={(
					values: FormType,
					{ setSubmitting }: FormikHelpers<FormType>
				) => {
					console.log(values);
					setSubmitting(false);
				}}
			>
				<Form className="modal-box bg-[#EDEDFE] flex flex-col gap-3 text-primary overflow-y-auto">
					<label htmlFor="transferType">Transfer Type</label>
					<FormikSelect
						selectOptions={transferType}
						formikFieldName="transferType"
						placeholder="Select..."
					/>
					{/* <Field id="transferType" name="transferType" placeholder="John" /> */}

					<label htmlFor="toAccount">Last Name</label>
					<Field id="toAccount" name="toAccount" placeholder="Doe" />
					<div className="modal-action">
						<button type="submit">Submit</button>
					</div>
				</Form>
			</Formik>
		</dialog>
	);
}
