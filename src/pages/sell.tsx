import SymbolQuantityLimit from "../components/input/buySellSymbolQuantityLimit";
import StockInfo from "../components/input/buySellStockInfo";
import { HiSwitchHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Sell() {
  return (
    <div className="h-screen flex">
      <div className="bg-[#F9E5E5] w-[35%]">
        <div className="relative mt-5">
          <div className="text-[#920000] font-semibold ml-5">
            <h1 className="text-4xl">SELL</h1>
            <p className="text-xl">Account Name</p>
          </div>
          <Link to={"/buy"}>
            <div className="absolute top-0 right-10 text-xl flex flex-row items-center">
              <div className="">
                <HiSwitchHorizontal />
              </div>
              <div className="text-success-content font-medium ">BUY</div>
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
