import { useState } from "react";

export default function TransferSuccessful() {
  const [showAlert, setShowAlert] = useState(true);
  const message = "Your transfer was successful";
  const buttonName = "View Transactions";

  return (
    <div className="h-screen flex items-center justify-center">
      {showAlert ? (
        <div className="alert shadow-lg max-w-fit min-h-[25%] bg-secondary">
          <div className="flex flex-col gap-6 p-3 text-primary items-center">
            <h3 className="font-bold text-4xl">SUCCESSFUL</h3>
            <div className="text-xl">{message}</div>
            <div className="flex flex-row gap-3 [&>button]:text-primary [&>button]:border-primary">
              <button
                className="btn btn-sm"
                onClick={() => setShowAlert(false)}
              >
                Close
              </button>
              <button className="btn btn-sm">{buttonName}</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
