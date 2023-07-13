import React from "react";
import Popup from "reactjs-popup";
import Select from "react-select";
import Dropdown from "../components/input/dropdown";

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

  return (
    <div>
      {/* Open the modal using ID.showModal() method */}
      <button className="btn" onClick={() => window.my_modal_5.showModal()}>
        open modal
      </button>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box flex flex-col gap-3">
          <h1 className="font-bold text-4xl">TRANSFER IN</h1>
          <h2 className="text-xl">Account</h2>
          <Dropdown data={people} />
        </form>
      </dialog>
    </div>
  );
}
