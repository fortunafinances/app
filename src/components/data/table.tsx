import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { ApolloError } from "@apollo/client";
import { GraphQLReturnData } from "../../utilities/types";
import DataContainer from "../container/dataContainer";

interface TableProps<DataType extends GraphQLReturnData> {
	loading: boolean;
	error: ApolloError | undefined;
	data: (DataType[] & { __typename: string }) | undefined;
	columnData: MRT_ColumnDef<DataType>[];
}

export default function Table<DataType extends GraphQLReturnData>({
	loading,
	error,
	data,
	columnData,
}: TableProps<DataType>) {
	if (loading)
		return (
			<span className="loading loading-infinity w-[5em] absolute-center"></span>
		);
	if (error)
		return (
			<DataContainer className="m-2 p-2 w-fit absolute-center bg-red-600 text-white text-3xl">
				<h2>{error.message}</h2>
			</DataContainer>
		);

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
			data={generateExtraData(data!)}
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
			enableRowActions
			renderRowActions={({ row }) => {
				if (row.original.__typename === "Holding")
					return (
						<div className="flex flex-nowrap gap-2 w-full justify-evenly">
							<button className="btn btn-primary">Buy</button>
							<button className="btn btn-secondary">Sell</button>
						</div>
					);
				else {
					return <></>;
				}
			}}
			positionActionsColumn="last"
			displayColumnDefOptions={{
				"mrt-row-actions": {
					header: "Trade", //change header text
					size: 50, //make actions column wider
				},
			}}
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
