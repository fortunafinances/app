import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Buy from "../input/trade/buy";
import Sell from "../input/trade/sell";
import StockInfo from "../input/trade/buySellStockInfo";
import { useEffect, useState } from "react";

export interface TradeProps {
  symbol: string;
  buyState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Trade() {
  const { state } = useLocation();
  const [buy, setBuy] = useState(true);
  const [symbol, setSymbol] = useState("");

  useEffect(() => {
    if (state !== null && state !== undefined) {
      const { tradeType, ticker } = state;
      setBuy(tradeType);
      setSymbol(ticker);
    }
  }, [state]);

  return (
    <div className="h-screen flex">
      <div className="bg-success w-[35%]">
        <div>
          {buy ? (
            <Buy buyState={setBuy} symbol={symbol} />
          ) : (
            <Sell buyState={setBuy} symbol={symbol} />
          )}
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <StockInfo symbol={symbol} />
      </div>
    </div>
  );
}
