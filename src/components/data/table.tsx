import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import { formatCentsToDollars } from "../../utilities/currency";

export type Order = {
	ticker: string;
	name: string;
	stockQuantity: number;
	price: number;
	value: string;
};

type HoldingsQuery = {
	holdings: Order[];
};

const GET_HOLDINGS = gql`
	query GetOrders {
		holdings {
			ticker
			price
			stockQuantity
			name
		}
	}
`;

export default function Table() {
	const { loading, error, data } = useQuery<HoldingsQuery>(GET_HOLDINGS);

	const columns = useMemo<MRT_ColumnDef<Order>[]>(
		() => [
			{
				accessorKey: "ticker",
				header: "Symbol",
			},
			{
				accessorKey: "name",
				header: "Name",
			},
			{
				accessorKey: "stockQuantity",
				header: "Quantity",
			},
			{
				accessorFn: (row) => `${formatCentsToDollars(row.price)}`,
				id: "price",
				sortingFn: (a, b) => {
					return a.original.price - b.original.price;
				},
				header: "Price",
			},
			{
				accessorFn: (row) =>
					`${formatCentsToDollars(row.stockQuantity * row.price)}`,
				sortingFn: (a, b) => {
					return (
						a.original.price * a.original.stockQuantity -
						b.original.price * b.original.stockQuantity
					);
				},
				id: "value",
				header: "Value",
			},
		],
		[]
	);

	if (loading) return <>loading...</>;
	if (error) return <>error!</>;

	return (
		<MaterialReactTable
			columns={columns}
			data={data!.holdings}
			enableColumnActions={false}
			enableColumnFilters={true}
			enablePagination={true}
			enableSorting={true}
			enableBottomToolbar={false}
			enableTopToolbar={true}
			muiTableBodyRowProps={{ hover: false }}
			initialState={{
				columnOrder: ["ticker", "name", "stockQuantity", "price", "value"],
			}}
			muiTableProps={{
				sx: {
					border: "1px solid rgba(81, 81, 81, 1)",
				},
			}}
			muiTableHeadCellProps={{
				sx: {
					border: "1px solid rgba(81, 81, 81, 1)",
				},
			}}
			muiTableBodyCellProps={{
				sx: {
					border: "1px solid rgba(81, 81, 81, 1)",
				},
			}}
		/>
	);
}
