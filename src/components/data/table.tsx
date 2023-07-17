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

	console.log(data);

	const getHoldingsData = (data: DataType[]) => {
		const holdingsData: DataType[] = [];
		for (let i = 0; i < 200; i++) {
			holdingsData.push(data[i % data.length]);
		}
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
			layoutMode="grid"
			defaultColumn={{
				minSize: 10,
				maxSize: 100,
				size: 60,
			}}
			initialState={{
				showColumnFilters: true,
			}}
			muiTableBodyProps={{
				sx: () => ({
					"& tr:nth-of-type(odd)": {
						backgroundColor: "#ddd",
					},
				}),
			}}
			muiTableContainerProps={({ table }) => ({
				sx: {
					height: `calc(100% - ${table.refs.topToolbarRef.current?.offsetHeight}px - ${table.refs.bottomToolbarRef.current?.offsetHeight}px)`,
					maxHeight: "680px",
					overflowY: "auto",
				},
			})}
			muiTablePaperProps={{
				sx: {
					height: "100%",
					maxWidth: "100%",
					m: "auto",
				},
			}}
			muiTableProps={{
				sx: {
					border: "1px solid rgba(81, 81, 81, 1)",
				},
			}}
			muiTableHeadCellProps={{
				sx: {
					border: "1px solid rgba(81, 81, 81, 1)",
					"& .MuiFormControl-root ": {
						overflowX: "hidden",
					},
				},
			}}
			muiTableBodyCellProps={{
				sx: {
					border: "1px solid rgba(81, 81, 81, 1)",
				},
			}}
			muiTableHeadCellFilterTextFieldProps={{
				sx: {
					minWidth: "5px",
				},
			}}
		/>
	);
}
