import { useState } from "react";

export default function ErrorNotification() {
  const [showAlert, setShowAlert] = useState(true); //if true: transfer success; false: order success

  return (
    <div className="h-screen flex items-center justify-center">
      {showAlert ? (
        <div className="alert flex flex-auto shadow-lg max-w-fit min-h-[25%] min-w-fit px-10 bg-[#F9E5E5]">
          <div className="flex flex-col gap-6 p-3 text-primary items-center">
            <h3 className="font-bold text-4xl">ERROR</h3>
            <div className="text-xl">Insufficient funds</div>
            <div className="flex flex-row gap-3 [&>button]:text-primary [&>button]:border-primary">
              <button
                className="btn btn-sm bg-white hover:bg-primary hover:text-white"
                onClick={() => setShowAlert(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
