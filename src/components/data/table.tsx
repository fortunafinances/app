import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";

type Person = {
	firstName: string;
	lastName: string;
	address: string;
	city: string;
	state: string;
};

const data = [
	{
		firstName: "Dylan",
		lastName: "Murray",
		address: "261 Erdman Ford",
		city: "East Daphne",
		state: "Kentucky",
	},
	{
		firstName: "Raquel",
		lastName: "Kohler",
		address: "769 Dominic Grove",
		city: "Columbus",
		state: "Ohio",
	},
	{
		firstName: "Ervin",
		lastName: "Reinger",
		address: "566 Brakus Inlet",
		city: "South Linda",
		state: "West Virginia",
	},
	{
		firstName: "Brittany",
		lastName: "McCullough",
		address: "722 Emie Stream",
		city: "Lincoln",
		state: "Nebraska",
	},
	{
		firstName: "Branson",
		lastName: "Frami",
		address: "32188 Larkin Turnpike",
		city: "Charleston",
		state: "South Carolina",
	},
];


export default function Table() {
	const columns = useMemo<MRT_ColumnDef<Person>[]>(
		//column definitions...
		() => [
			{
				accessorKey: "firstName",
				header: "First Name",
			},
			{
				accessorKey: "lastName",
				header: "Last Name",
			},
			{
				accessorKey: "address",
				header: "Address",
			},
			{
				accessorKey: "city",
				header: "City",
			},
			{
				accessorKey: "state",
				header: "State",
			},
		],
		[]
		//end
	);

	return (
		<MaterialReactTable
			columns={columns}
			data={data}
			enableColumnActions={false}
			enableColumnFilters={false}
			enablePagination={false}
			enableSorting={false}
			enableBottomToolbar={false}
			enableTopToolbar={false}
			muiTableBodyRowProps={{ hover: false }}
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
