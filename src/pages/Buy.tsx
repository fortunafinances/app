import SymbolQuantityLimit from "../components/input/buySellSymbolQuantityLimit";
import StockInfo from "../components/input/buySellStockInfo";
import { HiSwitchHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Buy() {
  // let stockPrice = 10;
  return (
    <div className="h-screen flex">
      <div className="bg-success w-[35%]">
        <div className="relative mt-5">
          <div className="text-success-content font-semibold ml-5">
            <h1 className="text-4xl">BUY</h1>
            <p className="text-xl">Account Name</p>
          </div>
          <Link to={"/sell"}>
            <div className="absolute top-0 right-10 text-xl flex flex-row items-center">
              <HiSwitchHorizontal />
              <div className="text-[#920000] font-medium ">SELL</div>
            </div>
          </Link>
        </div>
        <SymbolQuantityLimit />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <StockInfo />
      </div>
    </div>
  );
}
