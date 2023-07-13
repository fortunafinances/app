import React from "react";
import Popup from "reactjs-popup";
import Select from "react-select";
import Dropdown from "../components/input/dropdown";
import { BiDollar } from "react-icons/bi";

export default function TransferIn() {
  const people = [
    { id: 1, name: "Brokerage", unavailable: false },
    { id: 2, name: "College Fund", unavailable: false },
    { id: 3, name: "Extremely Super Duper Long Name Fund", unavailable: false },
  ];

  const aquaticCreatures = [
    { label: "Shark", value: "Shark" },
    { label: "Dolphin", value: "Dolphin" },
    { label: "Whale", value: "Whale" },
    { label: "Octopus", value: "Octopus" },
    { label: "Crab", value: "Crab" },
    { label: "Lobster", value: "Lobster" },
  ];

  const preventMinus = (e: any) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  return (
    <div>
      {/* Open the modal using ID.showModal() method */}
      <button
        className="btn text-primary bg-[#EDEDFE]"
        onClick={() => window.my_modal_1.showModal()}
      >
        Transfer In
      </button>
      <dialog id="my_modal_1" className="modal">
        <form
          method="dialog"
          className="modal-box bg-[#EDEDFE] flex flex-col gap-3 text-primary"
        >
          <h1 className="font-bold text-4xl">TRANSFER IN</h1>
          <h2 className="font-medium text-2xl">Account</h2>
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
          <div className="modal-action [&>button]:border-2">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn border-[#920000] text-[#920000] bg-[#F9E5E5] hover:shadow-xl shadow-[#920000] hover:bg-[#920000] hover:text-[#f9e5e5]">
              Discard
            </button>
            <button className="btn border-success-content text-success-content bg-[#E3FDDC] hover:shadow-xl shadow-succes-content hover:bg-success-content hover:text-[#e3fddc]">
              Submit
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
