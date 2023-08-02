import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { ApolloError } from "@apollo/client";
import { GraphQLReturnData, Holding } from "../../utilities/types";
import DataContainer from "../container/dataContainer";
import { symbol } from "../../utilities/reactiveVariables";
import { useNavigate } from "react-router-dom";
import AutoSizer, { Size } from "react-virtualized-auto-sizer";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface TableProps<DataType extends GraphQLReturnData> {
	loading: boolean;
	error: ApolloError | undefined;
	data: (DataType[] & GraphQLReturnData) | undefined;
	columnData: MRT_ColumnDef<DataType>[];
	enableRowActions?: boolean;
	sorting?: { id: string; desc: boolean }[];
}

export default function Table<DataType extends GraphQLReturnData>({
	loading,
	error,
	data,
	columnData,
	enableRowActions,
	sorting,
}: TableProps<DataType>) {
	const navigate = useNavigate();

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

	return (
		<AutoSizer>
			{({ height, width }: Size) => (
				<div style={{ height, width }} className="overflow-y-auto">
					<MaterialReactTable
						columns={columnData}
						data={data!}
						enableColumnActions={false}
						enableColumnFilters={true}
						enablePagination={true}
						enableSorting={true}
						enableBottomToolbar={true}
						enableStickyHeader={true}
						enableStickyFooter={true}
						enableTopToolbar={false}
						muiTableBodyRowProps={{ hover: false }}
						enableColumnResizing={true}
						sortDescFirst={false}
						layoutMode="grid"
						defaultColumn={{
							minSize: 10,
							maxSize: 100,
							size: 60,
						}}
						initialState={{
							showColumnFilters: true,
							sorting: sorting ?? [],
						}}
						enableRowActions={enableRowActions ?? true}
						renderRowActions={({ row }) => {
							if (
								row.original.__typename === "Holding"
							) {
								const holding =
									row.original as unknown as Holding &
									GraphQLReturnData;
								const filled = false;
								return (
									<div className="flex flex-col flex-nowrap gap-2 w-full justify-evenly [&>button]:min-h-0 [&>button]:h-8">
										<button
											className="btn btn-primary"
											onClick={() => {
												symbol(holding.stock.ticker);
												navigate("/app/trade", {
													state: { tradeType: true },
												});
											}}
										>
											Buy
										</button>
										<button
											className="btn btn-secondary"
											onClick={() => {
												symbol(holding.stock.ticker);
												navigate("/app/trade", {
													state: { tradeType: false },
												});
											}}
										>
											Sell
										</button>

										<div className="flex flex-row items-center justify-center">
											<button
												className="w-fit"
												onClick={() => {
													console.log("star");
												}}
											>
												{filled ? (
													<AiFillStar size={40} />
												) : (
													<AiOutlineStar
														size={40}
													/>
												)}
											</button>
										</div>

									</div>
								);
							} else {
								return <></>;
							}
						}}
						positionActionsColumn="last"
						displayColumnDefOptions={{
							"mrt-row-actions": {
								header: "Trade", //change header text
								size: 30, //make actions column wider
							},
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
								maxHeight: `calc(${height} - ${table.refs.topToolbarRef.current?.offsetHeight}px - ${table.refs.bottomToolbarRef.current?.offsetHeight}px)`,
								overflowY: "auto",
							},
						})}
						muiTableProps={{
							sx: {
								// border: "1px solid rgba(81, 81, 81, 1)",
							},
						}}
						muiTableHeadCellProps={{
							sx: {
								borderLeft: "1px solid rgba(81, 81, 81, 1)",
								borderRight: "1px solid rgba(81, 81, 81, 1)",
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
				</div>
			)}
		</AutoSizer>
	);
}
