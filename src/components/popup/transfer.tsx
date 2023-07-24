import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { BiDollar } from "react-icons/bi";
import { preventMinus } from "../../utilities/common";
import { accounts } from "../../utilities/reactiveVariables";
import { useMutation, useReactiveVar } from "@apollo/client";
import { GET_ACTIVITIES, MAKE_TRANSFER } from "../../utilities/graphQL";

type DropdownProps = {
	label: string;
	value: number;
};

export default function Transfer() {
	const accountList = useReactiveVar(accounts);

	type TransferReturnData = {
		insertTransfer: string;
	};

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

	const successModal = document.getElementById(
		"transfer_successful"
	) as HTMLDialogElement;
	const errorModal = document.getElementById(
		"transfer_error"
	) as HTMLDialogElement;

	const handleSubmit = () => {
		makeTransfer({
			variables: {
				sendAccId: fromAccount,
				receiveAccId: toAccount,
				transferAmt: Number(amount),
			},
		})
			.then((data) => {
				if (data.data?.insertTransfer === "Success") {
					setTransfer("");
					setFromAccount(null);
					setToAccount(null);
					setAmount(0);
					successModal.showModal();
				} else {
					errorModal.showModal();
				}
			})
			.catch(() => {
				errorModal.showModal();
			});
	};

	const transferType = [
		{ label: "In", value: "IN" },
		{ label: "Out", value: "OUT" },
		{ label: "Between", value: "BETWEEN" },
	];

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
			>
				<h1 className="font-bold text-4xl">TRANSFER {transfer}</h1>
				<h2 className="font-medium text-2xl">Transfer Type</h2>
				<Select
					menuPortalTarget={document.getElementById("transfer_modal")}
					options={transferType}
					onChange={(e) => {
						setTransfer(e!.value);
						checkBetween();
					}}
					theme={(theme) => ({
						...theme,
						borderRadius: 3,
					})}
				/>
				{!between ? (
					<div>
						<h2 className="font-medium text-2xl">Account</h2>
						<Select
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
							menuPortalTarget={document.getElementById("transfer_modal")}
							options={createDropdownItems(toAccount!)}
							theme={(theme) => ({
								...theme,
								borderRadius: 3,
							})}
							onChange={(e) => {
								setFromAccount(Number(e!.value));
							}}
						/>
						<label htmlFor="destAcct" className="font-medium text-2xl">
							To Account
						</label>
						<Select
							id="destAcct"
							menuPortalTarget={document.getElementById("transfer_modal")}
							options={createDropdownItems(fromAccount!)}
							theme={(theme) => ({
								...theme,
								primary: "black",
								borderRadius: 3,
							})}
							onChange={(e) => {
								setToAccount(Number(e!.value));
							}}
						/>
					</div>
				)}

				{/* Amount */}
				<h2 className="font-medium text-2xl">Amount</h2>
				<div className="relative">
					<i className="absolute top-[50%] -translate-y-[50%] align-middle">
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
						onKeyDown={preventMinus}
						className="input h-9 w-full border-[1px] rounded-[3px] border-[#cccccc] focus:ring-blue-500 focus:border-blue-500 focus:border-[2px] !outline-none"
					/>
				</div>
				{/* Discard and Submit */}
				<div className="modal-action [&>button]:border-2">
					{/* if there is a button in form, it will close the modal */}
					<button className="btn border-[#920000] text-[#920000] bg-[#F9E5E5] hover:shadow-xl shadow-[#920000] hover:bg-[#920000] hover:text-[#f9e5e5]">
						Discard
					</button>
					<button
						className="btn border-success-content text-success-content bg-[#E3FDDC] hover:shadow-xl shadow-succes-content hover:bg-success-content hover:text-[#e3fddc]"
						onClick={handleSubmit}
					>
						Submit
					</button>
				</div>
			</form>
		</dialog>
	);
}
