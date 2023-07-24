import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TransferSuccessful() {
	const [messageType, setMessageType] = useState(true);
	const [message, setMessage] = useState("Your transfer was successful.");
	const [buttonName, setButtonName] = useState("View Transactions");
	const [path, setPath] = useState("/app/activity");
	const navigate = useNavigate();

	useEffect(() => {
		if (messageType === false) {
			setMessage("Your order has been placed.");
			setButtonName("View Orders");
			setPath("/app/orders");
		}
	}, [messageType, setMessageType]);

	return (
		<dialog
			id="transfer_successful"
			className="modal flex items-center justify-center"
		>
			<form
				method="dialog"
				className="modal-box alert flex flex-auto shadow-lg max-w-fit min-h-[25%] min-w-fit px-10 bg-[#f2fcef]"
			>
				<div className="flex flex-col gap-6 p-3 text-primary items-center">
					<h3 className="font-bold text-4xl">SUCCESSFUL</h3>
					<div className="text-xl">{message}</div>
					<div className="modal-action flex flex-row gap-3 [&>button]:text-primary [&>button]:border-primary">
						<button className="btn btn-sm bg-white hover:bg-primary hover:text-white">
							Close
						</button>
						<button
							className="btn btn-sm bg-white hover:bg-primary hover:text-white"
							onClick={() => navigate(path)}
						>
							{buttonName}
						</button>
					</div>
				</div>
			</form>
		</dialog>
	);
}
