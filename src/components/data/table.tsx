import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { ApolloError } from "@apollo/client";

interface TableProps<DataType extends object> {
	loading: boolean;
	error: ApolloError | undefined;
	data: DataType[];
	columnData: MRT_ColumnDef<DataType>[];
}

export default function Table<DataType extends object>({
	loading,
	error,
	data,
	columnData,
}: TableProps<DataType>) {
	if (loading)
		return (
			<span className="loading loading-infinity w-[5em] absolute-center"></span>
		);
	if (error) return <>error!</>;

	const generateExtraData = (data: DataType[]) => {
		const ret: DataType[] = [];
		for (let i = 0; i < 200; i++) {
			ret.push(data[i % data.length]);
		}
		return ret;
	};

	return (
		<MaterialReactTable
			columns={columnData}
			data={generateExtraData(data)}
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
