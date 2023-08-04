import Select, { FormatOptionLabelMeta, SingleValue } from "react-select";
import { useField } from "formik";
import { Dropdown } from "../../utilities/types";
import { twMerge } from "tailwind-merge";
import { userInfo } from "../../utilities/reactiveVariables";
import { GET_ACCOUNTS } from "../../utilities/graphQL";
import { useQuery } from "@apollo/client";
import { formatDollars } from "../../utilities/common";

type Props = {
	selectOptions: { label: string; value: string | number }[];
	formikFieldName: string;
	placeholder?: string;
	id?: string;
	name?: string;
	key?: string;
};

/**
 * React Select but hooked into Formik
 */
export default function FormikSelect({
	selectOptions,
	formikFieldName,
	placeholder = "",
	...props
}: Props) {
	const field = useField(formikFieldName);
	const { setValue } = field[2];

	const { loading, error, data } = useQuery<{
		accounts: { accId: number; cash: number; name: string }[];
	}>(GET_ACCOUNTS, { variables: { userId: userInfo()?.userId } });

	const formatOptionLabel = (
		props: Dropdown,
		meta: FormatOptionLabelMeta<Dropdown>,
	) => {
		if (isNaN(Number(props.value))) {
			return <div>{props.label}</div>;
		}
		if (props?.label?.length === 0)
			return <div className="text-gray-500"></div>;
		return (
			<div className="flex flex-row items-center gap-2">
				<div>{props.label}</div>
				<p>|</p>
				<div
					className={twMerge(
						meta.context === "value" && "text-gray-500",
					)}
				>
					{loading
						? "..."
						: error
						? error.message
						: formatDollars(
								data?.accounts.find(
									(acc) => acc.accId === props.value,
								)?.cash,
						  )}
				</div>
			</div>
		);
	};

	const handleSelectChange = (option: SingleValue<Dropdown>) => {
		setValue(option?.value);
		field[0].onChange(option?.value);
	};

	return (
		<Select
			id={props.id}
			name={props.name}
			key={props.key}
			value={selectOptions.find(
				(option) => option.value === field[0].value,
			)}
			formatOptionLabel={(props, meta) => formatOptionLabel(props, meta)}
			options={selectOptions}
			placeholder={placeholder}
			onBlur={field[0].onBlur}
			onChange={handleSelectChange}
			className="rounded-md outline outline-[1px] outline-secondary"
			styles={{
				control: (base) => ({
					...base,
					border: 0,
					// This line disable the blue border
					boxShadow: "none",
				}),
				option: (styles) => ({
					...styles,
					minHeight: "40px",
				}),
			}}
		/>
	);
}
