import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { BiDollar } from "react-icons/bi";
import { preventMinus } from "../../utilities/common";
import { accounts } from "../../utilities/reactiveVariables";
import { useMutation, useReactiveVar } from "@apollo/client";
import { GET_ACTIVITIES, MAKE_TRANSFER } from "../../utilities/graphQL";
import { formatDollars } from "../../utilities/currency";
import { twMerge } from "tailwind-merge";

type DropdownProps = {
	label: string;
	value: string;
};

type TransferReturnData = {
	insertTransfer: string;
};

const transferType: DropdownProps[] = [
	{ label: "In", value: "IN" },
	{ label: "Out", value: "OUT" },
	{ label: "Between", value: "BETWEEN" },
];

interface Values {
	transferType: string;
	toAccount: string;
	fromAccount: string;
	amount: number;
}

export default function Transfer() {
	const accountList = useReactiveVar(accounts);

	const getAccountValue = useCallback(
		(id: number) => {
			return accountList.find((account) => {
				return account.accId === id;
			})?.cash;
		},
		[accountList]
	);

	const getAccount = (id: number) =>
		accountList.find((account) => account.accId === id);

	const [makeTransfer] = useMutation<TransferReturnData>(MAKE_TRANSFER, {
		refetchQueries: [
			{
				query: GET_ACTIVITIES,
			},
		],
	});

	const [fromAccount, setFromAccount] = useState<number | null>(null);
	const [toAccount, setToAccount] = useState<number | null>(null);
	const [amount, setAmount] = useState(0);
	const [transfer, setTransfer] = useState("");
	const [between, setBetween] = useState(false);
	const [valid, setValid] = useState(false);

	const successModal = document.getElementById(
		"transfer_successful"
	) as HTMLDialogElement;
	const errorModal = document.getElementById(
		"transfer_error"
	) as HTMLDialogElement;

	const handleSubmit = () => {
		if (!valid) return;
		makeTransfer({
			variables: {
				sendAccId: fromAccount,
				receiveAccId: toAccount,
				transferAmt: Number(amount),
			},
		})
			.then((data) => {
				if (data.data?.insertTransfer === "Success") {
					clearForm();
					successModal.showModal();
				} else {
					errorModal.showModal();
				}
			})
			.catch(() => {
				errorModal.showModal();
			});
	};

	useEffect(() => {
		if (
			!fromAccount ||
			!toAccount ||
			!amount ||
			!transfer ||
			amount >= getAccountValue(fromAccount)!
		) {
			setValid(false);
		} else {
			setValid(true);
		}
	}, [amount, fromAccount, getAccountValue, toAccount, transfer]);

	const clearForm = () => {
		setTransfer("");
		setFromAccount(null);
		setToAccount(null);
		setAmount(0);
	};

	const createDropdownItems = useCallback(
		(exclude?: number) => {
			const ret: DropdownProps[] = [];
			accountList.map((account) => {
				if (account.accId !== exclude || exclude === undefined) {
					ret.push({ label: account.name, value: account.accId });
				}
			});
			return ret;
		},
		[accountList]
	);

	const checkBetween = useCallback(() => {
		if (transfer === "BETWEEN") {
			setBetween(true);
		} else {
			setBetween(false);
		}
	}, [transfer]);

	useEffect(() => {
		if (transfer !== "") {
			checkBetween();
		}
	}, [checkBetween, transfer]);

	return (
		<dialog id="transfer_modal" className="modal overflow-none">
			<form
				method="dialog"
				className="modal-box bg-[#EDEDFE] flex flex-col gap-3 text-primary overflow-y-auto"
				onSubmit={formik.handleSubmit}
			>
				<h1 className="font-bold text-4xl">TRANSFER {transfer}</h1>
				<label htmlFor="transferType" className="font-medium text-2xl">
					Transfer Type
				</label>
				<Select
					menuPortalTarget={document.getElementById("transfer_modal")}
					name="transferType"
					id="transferType"
					options={transferType}
					onChange={formik.handleChange}
					value={formik.values.transferType}
					theme={(theme) => ({
						...theme,
						borderRadius: 3,
					})}
				/>
				{!between ? (
					<div>
						<h2 className="font-medium text-2xl">Account</h2>
						<Select
							key={"singleAccount"}
							menuPortalTarget={document.getElementById("transfer_modal")}
							options={createDropdownItems()}
							theme={(theme) => ({
								...theme,
								borderRadius: 3,
							})}
						/>
					</div>
				) : (
					<div>
						<label htmlFor="sourceAcct" className="font-medium text-2xl">
							From Account
						</label>
						<Select
							id="sourceAcct"
							key={"sourceAcct"}
							menuPortalTarget={document.getElementById("transfer_modal")}
							options={createDropdownItems(toAccount!)}
							theme={(theme) => ({
								...theme,
								borderRadius: 3,
							})}
							onChange={(e) => {
								setFromAccount(Number(e!.value));
							}}
							placeholder="Select an account"
							value={
								fromAccount
									? {
											label: getAccount(fromAccount)?.name,
											value: fromAccount,
									  }
									: undefined
							}
						/>
						<label htmlFor="destAcct" className="font-medium text-2xl">
							To Account
						</label>
						<Select
							id="destAcct"
							key={"destAcct"}
							menuPortalTarget={document.getElementById("transfer_modal")}
							options={createDropdownItems(fromAccount!)}
							theme={(theme) => ({
								...theme,
								primary: "black",
								borderRadius: 3,
							})}
							placeholder="Select an account"
							onChange={(e) => {
								setToAccount(Number(e!.value));
							}}
							value={
								toAccount
									? {
											label: getAccount(toAccount)?.name,
											value: toAccount,
									  }
									: undefined
							}
						/>
					</div>
				)}

				{/* Amount */}
				<h2 className="font-medium text-2xl">Amount</h2>
				<div className="flex flex-row justify-center items-center gap-2">
					<div className="flex flex-col">
						<div className="relative">
							<i className="absolute top-[50%] -translate-y-[50%]">
								<BiDollar />
							</i>
							<input
								type="number"
								min={0}
								step="0.01"
								placeholder="Price"
								onChange={(e) => {
									setAmount(Number(e.target.value));
								}}
								value={amount}
								onKeyDown={preventMinus}
								className="input h-9 w-full border-[1px] rounded-[3px] border-[#cccccc] focus:ring-blue-500 focus:border-blue-500 focus:border-[2px] !outline-none"
							/>
						</div>
						<p
							className={twMerge(
								"text-red-500 hidden text-xs",
								amount >= getAccountValue(fromAccount!)! && "inline"
							)}
						>
							Amount must be less than source account value!
						</p>
					</div>
					<h2 className="text-center">
						<span className="text-lg font-bold">Source Account Value: </span>
						{formatDollars(getAccountValue(fromAccount!)!)}
					</h2>
				</div>
				{/* Discard and Submit */}
				<div className="modal-action [&>button]:border-2">
					{/* if there is a button in form, it will close the modal */}
					<button
						className="btn border-[#920000] text-[#920000] bg-[#F9E5E5] hover:shadow-xl shadow-[#920000] hover:bg-[#920000] hover:text-[#f9e5e5]"
						onClick={clearForm}
					>
						Discard
					</button>
					<button
						className="btn border-success-content text-success-content bg-[#E3FDDC] hover:shadow-xl shadow-success-content hover:bg-success-content hover:text-[#e3fddc]"
						onClick={handleSubmit}
						disabled={!valid}
					>
						Submit
					</button>
				</div>
			</form>
		</dialog>
	);
}
