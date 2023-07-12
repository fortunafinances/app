import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { DocumentNode, useQuery } from "@apollo/client";

interface TableProps<DataType extends object> {
	QUERY: DocumentNode;
	columnData: MRT_ColumnDef<DataType>[];
}

export default function Table<DataType extends object>({
	QUERY,
	columnData,
}: TableProps<DataType>) {
	type HoldingsQuery = {
		holdings: DataType[];
	};

	const { loading, error, data } = useQuery<HoldingsQuery>(QUERY);

	if (loading)
		return (
			<span className="loading loading-infinity loading-lg absolute-center"></span>
		);
	if (error) return <>error!</>;

	return (
		<MaterialReactTable
			columns={columnData}
			data={data!.holdings}
			enableColumnActions={false}
			enableColumnFilters={true}
			enablePagination={true}
			enableSorting={true}
			enableBottomToolbar={false}
			enableTopToolbar={false}
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
