import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import TransferIn from "../popup/transferIn";

const navItems = ["overview", "holdings", "orders", "activity"];

export default function AppNavigation() {
  const path = useLocation().pathname;
  const currentPage = path.split("/")[path.split("/").length - 1];
  return (
    <nav className="bg-gray-800 border-l-2 border-gray-200  ">
      <div className="flex flex-row justify-between items-center">
        <div className="text-white">
          {navItems.map((item, i) => {
            return (
              <Link key={i} to={item}>
                <p
                  className={twMerge(
                    "inline-block px-3 py-2 capitalize underline-offset-4",
                    item === currentPage && "underline font-semibold"
                  )}
                >
                  {item}
                </p>
              </Link>
            );
          })}
        </div>
        <button
          className="btn text-primary bg-[#EDEDFE] min-h-[2rem] h-[1rem] mr-3"
          onClick={() => {
            (document.getElementById("my_modal_1")! as HTMLDialogElement).showModal();
          }}
        >
          Transfer
        </button>
        <TransferIn />
      </div>
    </nav>
  );
}
