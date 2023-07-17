import { AiFillCaretDown } from "react-icons/ai";

export default function StockInfo() {
  const company = "Apple";
  const symbol = "AAPL";
  const price = 191.34;
  const dollarChange = 1.12;
  const percentChange = 0.58;

  return (
    <div className="flex-1 overflow-y-scroll">
      <div className="flex flex-col">
        {/* heading: Company name, symbol, stock price */}
        <div className="flex justify-between md:flex-row lg:gap-20 m-6">
          <div className="flex flex-col gap-5">
            <h1 className="text-6xl font-semibold">{company}</h1>
            <h2 className="text-4xl text-[#929292]">{symbol}</h2>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="text-6xl text-primary font-medium">${price}</h1>
            <div className="flex flex-row text-primary font-semibold text-xl items-center">
              <div>
                <AiFillCaretDown />
              </div>
              <div>
                ${dollarChange} ({percentChange}%) Today
              </div>
            </div>
          </div>
        </div>
        {/* Graph */}
        <div className="h-[50vh] w-[90%] border-4 border-primary m-[5%]"></div>
        <div className="m-6 flex flex-col gap-3">
          {/* About the Company */}
          <div className="text-4xl font-medium ">About {company}</div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus
            egestas sed sed risus pretium quam. Sed elementum tempus egestas sed
            sed risus. Faucibus a pellentesque sit amet porttitor eget dolor
            morbi non. Ultrices tincidunt arcu non sodales neque. Venenatis cras
            sed felis eget velit. Lacinia quis vel eros donec ac. Fames ac
            turpis egestas integer eget aliquet nibh praesent tristique. Mauris
            ultrices eros in cursus turpis massa tincidunt. Ipsum a arcu cursus
            vitae congue mauris rhoncus. Posuere ac ut consequat semper viverra
            nam. Felis donec et odio pellentesque diam volutpat commodo sed
            egestas. Ante metus dictum at tempor commodo ullamcorper a lacus
            vestibulum. Euismod nisi porta lorem mollis aliquam ut porttitor
            leo. Suspendisse sed nisi lacus sed viverra tellus in hac. Vel elit
            scelerisque mauris pellentesque pulvinar. Sed risus pretium quam
            vulputate dignissim suspendisse in est ante. Sagittis purus sit amet
            volutpat consequat mauris. Ornare quam viverra orci sagittis eu
            volutpat odio facilisis mauris. Est ante in nibh mauris cursus
            mattis molestie a. Amet nulla facilisi morbi tempus iaculis. Sit
            amet venenatis urna cursus eget nunc. Elit eget gravida cum sociis
            natoque. Bibendum est ultricies integer quis auctor. Proin sagittis
            nisl rhoncus mattis rhoncus urna neque viverra justo. Pretium
            viverra suspendisse potenti nullam. Ut tristique et egestas quis
            ipsum. Sed blandit libero volutpat sed cras ornare arcu dui. Et
            egestas quis ipsum suspendisse ultrices. Volutpat odio facilisis
            mauris sit amet massa vitae. Cursus sit amet dictum sit amet justo.
            Enim blandit volutpat maecenas volutpat blandit. A erat nam at
            lectus. Habitant morbi tristique senectus et netus. Vulputate enim
            nulla aliquet porttitor lacus. Feugiat vivamus at augue eget arcu
            dictum varius duis at. Mi tempus imperdiet nulla malesuada. Ultrices
            gravida dictum fusce ut placerat orci nulla. Id semper risus in
            hendrerit gravida rutrum quisque. Vulputate mi sit amet mauris
            commodo quis imperdiet massa tincidunt. Eget mi proin sed libero
            enim.
          </div>
        </div>
      </div>
    </div>
  );
}
