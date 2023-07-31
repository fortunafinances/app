export interface errorProp {
	modalId: string;
	message: string;
}

export default function ErrorNotification({ modalId, message }: errorProp) {
	return (
		<dialog id={modalId} className="modal flex items-center justify-center">
			<form
				method="dialog"
				className="modal-box alert flex flex-auto shadow-lg max-w-fit min-h-[25%] min-w-fit px-10 bg-[#F9E5E5]"
			>
				<div className="flex flex-col gap-6 p-3 text-primary items-center">
					<h3 className="font-bold text-4xl">ERROR</h3>
					<div className="text-xl">{message}</div>
					<div className="modal-action flex flex-row gap-3 [&>button]:text-primary [&>button]:border-primary">
						<button className="btn btn-sm bg-white hover:bg-primary hover:text-white">
							Close
						</button>
					</div>
				</div>
			</form>
		</dialog>
	);
}
