import SymbolQuantityLimit from "./buySellSymbolQuantityLimit";
import StockInfo from "./buySellStockInfo";
import { HiSwitchHorizontal } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { TradeProps } from "../../../components/layout/trade";

export default function Sell({ symbol, buyState }: TradeProps) {
  return (
    <div>
      <div className="relative mt-5">
        <div className="text-[#920000] font-semibold ml-5">
          <h1 className="text-4xl">SELL</h1>
          <p className="text-xl">Account Name</p>
        </div>
        {/* <Link to={"/buy"}> */}
        <button
          onClick={() => buyState((state) => !state)}
          className="absolute top-0 right-10 text-xl flex flex-row items-center"
        >
          <HiSwitchHorizontal />
          <div className="text-success-content font-medium ">BUY</div>
        </button>
        {/* </Link> */}
      </div>
      <SymbolQuantityLimit />
    </div>
  );
}
