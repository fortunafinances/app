import { useQuery, useReactiveVar } from "@apollo/client";
import Table from "../../components/data/table";
import { useMemo } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { Order, GraphQLReturnData } from "../../utilities/types";
import { filterInclusive, formatDate, isMobile, sortDate } from "../../utilities/common";
import { currentAccountId } from "../../utilities/reactiveVariables";
import NoInvestments from "../../components/data/noInvestments";
import { useWindowSize } from "../../utilities/hooks";
import OrderCard from "../../components/data/cards/orderCard";
import { GET_ORDERS } from "../../utilities/graphQL";

export default function Orders() {
	const accountId = useReactiveVar(currentAccountId);
	const windowSize = useWindowSize().width;
	const cols = useMemo<MRT_ColumnDef<Order>[]>(
		() => [
			{
				header: "Date",
				id: "date",
				accessorFn: (row) => `${formatDate(row.date)}`,
				sortingFn: (a, b) => sortDate(a.original.date, b.original.date),
			},
			{
				header: "Type",
				accessorKey: "type",
				size: 30,
				filterVariant: "select",
				filterSelectOptions: ["Market", "Limit"],
			},
			{
				header: "Side",
				accessorKey: "side",
				size: 40,
				filterVariant: "select",
				filterSelectOptions: ["Buy", "Sell"],
			},
			{
				header: "Symbol",
				accessorKey: "stock.ticker",
				size: 45,
			},
			{
				header: "Name",
				accessorKey: "stock.name",
				size: 50,
			},
			{
				header: "Quantity",
				accessorKey: "tradeQty",
				size: 40,
				filterFn: filterInclusive,
				filterVariant: "range",
			},
			{
				header: "Status",
				accessorKey: "status",
				size: 50,
				filterVariant: "select",
				filterSelectOptions: ["Placed", "Executed"],
			},
		],
		[],
	);

	type OrdersQuery = {
		orders: Order[] & GraphQLReturnData;
	};

	const { loading, error, data } = useQuery<OrdersQuery>(GET_ORDERS, {
		variables: { accId: accountId },
	});

    let sortedData;
    if (!loading && data?.orders?.length === 0) {
        return <NoInvestments />
    } else if (data && data.orders) {
        sortedData = [...data.orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

	return (
		<div className="h-full w-full">
			{isMobile(windowSize) ? (
				<>
					<div className="flex flex-row justify-center py-3">
						<h1 className="text-2xl font-bold">Orders</h1>
					</div>
					{sortedData?.map((order: Order, i) => (
						<OrderCard
							key={i}
							ticker={order.stock.ticker}
							company={order.stock.name!}
							tradeQty={order.tradeQty}
							date={order.date}
							status={order.status}
							side={order.side}
							type={order.type}
						/>
					))}
				</>
			) : (
				<Table
					loading={loading}
					error={error}
					data={data?.orders}
					columnData={cols}
					enableRowActions={false}
					sorting={[{ id: "date", desc: true }]}
				/>
			)}
		</div>
	);
}
