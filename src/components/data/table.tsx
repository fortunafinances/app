import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { gql, useQuery } from "@apollo/client";

export type Order = {
	ticker: string;
	name: string;
	quantity: number;
	price: string;
	value: string;
};

const GET_HOLDINGS = gql`
	query GetOrders {
		holdings {
			ticker
			price
			quantity
		}
	}
`;

export default function Table() {
	const { loading, error, data } = useQuery<Order[]>(GET_HOLDINGS);

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
				accessorKey: "quantity",
				header: "Quantity",
			},
			{
				accessorKey: "price",
				header: "Price",
			},
			{
				accessorFn: (row) => `${row.quantity * parseInt(row.price)}`,
				id: "value",
				header: "Value",
			},
		],
		[]
	);

	if (loading) return <>loading...</>;
	if (error) return <>error!</>;

	console.log(data);
	console.log(error);

	return (
		<MaterialReactTable
			columns={columns}
			data={data!}
			enableColumnActions={false}
			enableColumnFilters={true}
			enablePagination={true}
			enableSorting={true}
			enableBottomToolbar={false}
			enableTopToolbar={true}
			muiTableBodyRowProps={{ hover: false }}
			initialState={{
				columnOrder: ["ticker", "name", "quantity", "price", "value"],
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
