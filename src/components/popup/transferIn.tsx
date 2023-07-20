import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { BiDollar } from "react-icons/bi";
import { preventMinus } from "../../utilities/common";
import { accounts } from "../../utilities/reactiveVariables";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

type DropdownProps = {
	label: string;
	value: number;
};

export default function TransferIn() {
	const navigate = useNavigate();
	const MAKE_TRANSFER = gql`
		mutation InsertTransfer(
			$sendAccId: Int!
			$receiveAccId: Int!
			$transferAmt: Float!
		) {
			insertTransfer(
				sendAccId: $sendAccId
				receiveAccId: $receiveAccId
				transferAmt: $transferAmt
			)
		}
	`;

	const [makeTransfer, { data, loading, error }] = useMutation(MAKE_TRANSFER);

	const handleSubmit = () => {
		makeTransfer({
			variables: { sendAccId: 1, receiveAccId: 2, transferAmt: 100 },
		}).catch((err) => {
			console.error(err);
		});
		navigate("activity");
	};

	const transferType = [
		{ label: "In", value: "IN" },
		{ label: "Out", value: "OUT" },
		{ label: "Between", value: "BETWEEN" },
	];

	const createDropdownItems = () => {
		const ret: DropdownProps[] = [];
		accounts.map((account) => {
			ret.push({ label: account.name, value: account.id });
		});
		return ret;
	};

	const [transfer, setTransfer] = useState("");
	const [between, setBetween] = useState(false);

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
		<dialog id="transfer_modal" className="modal">
			<form
				method="dialog"
				className="modal-box bg-[#EDEDFE] flex flex-col gap-3 text-primary overflow-y-visible"
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
						<h2 className="font-medium text-2xl">From Account</h2>
						<Select
							menuPortalTarget={document.getElementById("transfer_modal")}
							options={createDropdownItems()}
							theme={(theme) => ({
								...theme,
								borderRadius: 3,
							})}
						/>
						<h2 className="font-medium text-2xl">To Account</h2>
						<Select
							menuPortalTarget={document.getElementById("transfer_modal")}
							options={createDropdownItems()}
							theme={(theme) => ({
								...theme,
								primary: "black",
								borderRadius: 3,
							})}
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
