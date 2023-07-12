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
			<span className="loading loading-infinity w-[5em] absolute-center"></span>
		);
	if (error) return <>error!</>;

	const getHoldingsData = (data: DataType[]) => {
		const holdingsData: DataType[] = [];
		for (let i = 0; i < 200; i++) {
			holdingsData.push(data[i % 4]);
		}
		console.log(holdingsData);
		return holdingsData;
	};

	return (
		<MaterialReactTable
			columns={columnData}
			data={getHoldingsData(data!.holdings)}
			enableColumnActions={false}
			enableColumnFilters={true}
			enablePagination={true}
			enableSorting={true}
			enableBottomToolbar={true}
			enableStickyFooter
			enableTopToolbar={false}
			muiTableBodyRowProps={{ hover: false }}
			enableColumnResizing={true}
			defaultColumn={{
				minSize: 20, //allow columns to get smaller than default
				maxSize: 9001, //allow columns to get larger than default
				size: 70, //make columns wider by default
			}}
			muiTableContainerProps={{ sx: { maxHeight: "80.2vh" } }}
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
