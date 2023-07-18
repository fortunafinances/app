import SymbolQuantityLimit from "../trade/buySellSymbolQuantityLimit";
// import StockInfo from "./buySellStockInfo";
import { HiSwitchHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TradeProps } from "../../../components/layout/trade";

export default function Buy({ symbol, buyState }: TradeProps) {
  return (
    <div className="relative mt-5">
      <div className="text-success-content font-semibold ml-5">
        <h1 className="text-4xl">BUY</h1>
        <p className="text-xl">Account Name</p>
        {/* <Link to={"/sell"}> */}
        <button
          onClick={() => buyState((state) => !state)}
          className="absolute top-0 right-10 text-xl flex flex-row items-center"
        >
          <HiSwitchHorizontal />
          <div className="text-[#920000] font-medium ">SELL</div>
        </button>
        {/* </Link> */}
      </div>
      <SymbolQuantityLimit symbol={symbol} />
    </div>
  );
}
