export default function StockInfo() {
  const company = "Apple";
  const symbol = "AAPL";

  return (
    <div className="flex-1 overflow-y-scroll">
      <div className="flex flex-col gap-5 m-6">
        <h1 className="text-6xl font-semibold">{company}</h1>
        <h2 className="text-4xl text-blue-300">{symbol}</h2>
      </div>
    </div>
  );
}
