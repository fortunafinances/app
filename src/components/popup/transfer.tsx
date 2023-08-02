import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import FormikSelect from "../input/formikSelect";
import { currentAccountId, userInfo } from "../../utilities/reactiveVariables";
import { Account } from "../../utilities/types";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect, useRef } from "react";

import {
	GET_ACCOUNTS,
	GET_ACTIVITIES,
	GET_OVERVIEW,
	GET_OVERVIEW_LINE_CHART,
	GET_TOTAL_VALUE,
	MAKE_TRANSFER,
} from "../../utilities/graphQL";
import * as Yup from "yup";

interface FormType {
	transferType: string;
	transferInAccount: number | string;
	transferOutAccount: number | string;
	toAccount?: number | string;
	fromAccount?: number | string;
	amount: string;
}

type DropdownProps = {
	label: string;
	value: string | number;
};

type TransferReturnData = {
	insertTransfer: string;
};

const transferType: DropdownProps[] = [
	{ label: "In", value: "IN" },
	{ label: "Out", value: "OUT" },
	{ label: "Between", value: "BETWEEN" },
];

const makeAccountList = (accounts: Account[], index?: number) => {
	const ret: DropdownProps[] = [{ label: "", value: "" }];
	accounts.map((account) => {
		if (index) {
			if (account.accId === index) return;
		}
		ret.push({ label: account.name, value: account.accId });
	});
	return ret;
};

export default function Transfer() {
	const accountId = useReactiveVar(currentAccountId);
	const { loading, data } = useQuery<{ accounts: Account[] }>(GET_ACCOUNTS, {
		variables: { userId: userInfo()?.userId },
	});

	const [makeTransfer] = useMutation<TransferReturnData>(MAKE_TRANSFER, {
		refetchQueries: [
			{ query: GET_ACTIVITIES, variables: { accId: currentAccountId() } },
			{ query: GET_OVERVIEW, variables: { accId: currentAccountId() } },
			{
				query: GET_TOTAL_VALUE,
				variables: { userId: userInfo()?.userId },
			},
			{query: GET_OVERVIEW_LINE_CHART, variables: {accId: currentAccountId()}}
		],
	});

	const transferRef = useRef<HTMLDialogElement>(null);
	const formikRef = useRef<FormikProps<FormType>>(null);

	useEffect(() => {
		if (accountId !== undefined) {
			formikRef.current?.resetForm({
				values: {
					...formikRef.current.values,
					transferType: "IN",
					transferInAccount: accountId,
					transferOutAccount: accountId,
				},
			});
		}
	}, [accountId]);

	const validationSchema = Yup.object().shape({
		transferType: Yup.string().required("*Required"),
		transferInAccount: Yup.number().when("transferType", {
			is: "IN",
			then: (schema) => schema.required("*Required"),
		}),
		transferOutAccount: Yup.number().when("transferType", {
			is: "OUT",
			then: (schema) => schema.required("*Required"),
		}),
		toAccount: Yup.number().when("transferType", {
			is: "BETWEEN",
			then: (schema) => schema.required("*Required"),
		}),
		fromAccount: Yup.number().when("transferType", {
			is: "BETWEEN",
			then: (schema) => schema.required("*Required"),
		}),
		amount: Yup.number()
			.required("*Required")
			.moreThan(0, "Must be greater than 0")
			.when("transferType", {
				is: "IN",
				then: (schema) =>
					schema.max(1_000_000, "Exceeded maximum deposit"),
			})
			.when("transferType", {
				is: "OUT",
				then: (schema) =>
					schema.test({
						name: "balance",
						message: "${path} exceeds account balance",
						test: (value, context) => {
							const account = data!.accounts.find(
								(acc) =>
									acc.accId ===
									context.resolve(
										Yup.ref("transferOutAccount"),
									),
							);
							return value <= account!.cash;
						},
					}),
			})
			.when("transferType", {
				is: "BETWEEN",
				then: (schema) =>
					schema.test({
						name: "balance",
						message: "${path} exceeds account balance",
						test: (value, context) => {
							const account = data!.accounts.find(
								(acc) =>
									acc.accId ===
									context.resolve(Yup.ref("fromAccount")),
							);
							if (!account) return false;
							return value <= account.cash;
						},
					}),
			}),
	});

	const successModal = document.getElementById(
		"transfer_successful",
	) as HTMLDialogElement;
	const errorModal = document.getElementById(
		"transfer_error",
	) as HTMLDialogElement;

	return (
		<dialog id="transfer_modal" className="modal" ref={transferRef}>
			<Formik
				innerRef={formikRef}
				initialValues={{
					transferType: "IN",
					transferInAccount: currentAccountId() ?? "",
					transferOutAccount: currentAccountId(),
					toAccount: "",
					fromAccount: "",
					amount: "",
				}}
				validationSchema={validationSchema}
				onSubmit={(
					values,
					{ setSubmitting, resetForm }: FormikHelpers<FormType>,
				) => {
					makeTransfer({
						variables: {
							sendAccId:
								values.transferType === "OUT"
									? values.transferOutAccount
									: values.transferType === "IN"
									? 0
									: values.fromAccount,
							receiveAccId:
								values.transferType === "OUT"
									? 0
									: values.transferType === "IN"
									? values.transferInAccount
									: values.toAccount,
							transferAmt: values.amount,
						},
					})
						.then((data) => {
							if (data.data?.insertTransfer === "Success") {
								if (values.transferType === "IN") {
									currentAccountId(
										Number(values.transferInAccount),
									);
								} else if (values.transferType === "OUT") {
									currentAccountId(
										Number(values.transferOutAccount),
									);
								} else {
									currentAccountId(Number(values.toAccount));
								}
								resetForm();
								successModal.showModal();
							} else {
								errorModal.showModal();
							}
						})
						.catch(() => {
							errorModal.showModal();
						})
						.finally(() => {
							transferRef.current?.close();
							setSubmitting(false);
						});
				}}
			>
				{({ values, errors, touched, isValid }) => {
					if (!data) return <></>;
					return (
						<Form className="modal-box bg-[#EDEDFE] flex flex-col gap-3 text-primary overflow-y-auto min-h-[15em]">
							<label htmlFor="transferType">Transfer Type</label>
							<FormikSelect
								id="transferType"
								selectOptions={transferType}
								formikFieldName="transferType"
								placeholder="Select..."
							/>
							{errors.transferType && touched.transferType && (
								<p className="text-red-600">
									{errors.transferType}
								</p>
							)}
							{loading ? (
								<span className="loading loading-dots loading-md" />
							) : values.transferType === "" ? (
								<></>
							) : values.transferType === "IN" ? (
								<div>
									<label htmlFor="transferInAccount">
										Destination Account
									</label>
									<FormikSelect
										id="transferInAccount"
										name="transferInAccount"
										key="transferInAccount"
										selectOptions={makeAccountList(
											data.accounts,
										)}
										formikFieldName="transferInAccount"
										placeholder="Select..."
									/>
									{errors.transferInAccount &&
										touched.transferInAccount && (
											<p className="text-red-600">
												{errors.transferInAccount}
											</p>
										)}
								</div>
							) : values.transferType === "OUT" ? (
								<div>
									<label htmlFor="transferOutAccount">
										Source Account
									</label>
									<FormikSelect
										id="transferOutAccount"
										name="transferOutAccount"
										key="transferOutAccount"
										selectOptions={makeAccountList(
											data.accounts,
										)}
										formikFieldName="transferOutAccount"
										placeholder="Select..."
									/>
									{errors.transferOutAccount &&
										touched.transferOutAccount && (
											<p className="text-red-600">
												{errors.transferOutAccount}
											</p>
										)}
								</div>
							) : (
								<div>
									<label htmlFor="fromAccount">
										Source Account
									</label>
									<FormikSelect
										id="fromAccount"
										name="fromAccount"
										key="fromAccount"
										selectOptions={makeAccountList(
											data.accounts,
											Number(values.toAccount),
										)}
										formikFieldName="fromAccount"
										placeholder="Select..."
									/>
									{errors.fromAccount &&
										touched.fromAccount && (
											<p className="text-red-600">
												{errors.fromAccount}
											</p>
										)}
									<label htmlFor="toAccount">
										Destination Account
									</label>
									<FormikSelect
										id="toAccount"
										name="toAccount"
										key="toAccount"
										selectOptions={makeAccountList(
											data.accounts,
											Number(values.fromAccount),
										)}
										formikFieldName="toAccount"
										placeholder="Select..."
									/>
									{errors.toAccount && touched.toAccount && (
										<p className="text-red-600">
											{errors.toAccount}
										</p>
									)}
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
								{errors.amount && (
									<p className="text-red-600">
										{errors.amount}
									</p>
								)}
							</div>

							<div className="modal-action">
								<button
									type="button"
									className="btn outline outline-1 outline-black bg-secondary"
									onClick={() => {
										transferRef.current?.close();
									}}
								>
									Close
								</button>
								<button
									type="submit"
									disabled={!isValid}
									className="btn outline outline-1 outline-black"
								>
									Submit
								</button>
							</div>
						</Form>
					);
				}}
			</Formik>
		</dialog>
	);
}
