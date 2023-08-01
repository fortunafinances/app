import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface tradeProp {
	transfer: boolean;
	modalId: string;
}

export default function SuccessfulNotification({ transfer, modalId }: tradeProp) {
	//   const [messageType, setMessageType] = useState(transfer); //false shpws ORDERS; true shows TRANSFERS
	const [message, setMessage] = useState("Your transfer was successful.");
	const [buttonName, setButtonName] = useState("View Transactions");
	const [path, setPath] = useState("/app/activity");
	const navigate = useNavigate();

	useEffect(() => {
		if (!transfer) {
			setMessage("Your order has been placed.");
			setButtonName("View Orders");
			setPath("/app/orders");
		}
	}, [transfer]);

	return (
		<dialog id={modalId} className="modal flex items-center justify-center">
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
							onClick={() =>
								navigate(path)
							}
						>
							{buttonName}
						</button>
					</div>
				</div>
			</form>
		</dialog>
	);
}
