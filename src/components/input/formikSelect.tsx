import Select, { FormatOptionLabelMeta } from "react-select";
import { useField } from "formik";
import { Dropdown } from "../../utilities/types";
import { twMerge } from "tailwind-merge";

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
 * @returns {JSX.Element}
 * @constructor
 */
export default function FormikSelect({
	selectOptions,
	formikFieldName,
	placeholder = "",
	...props
}: Props) {
	const field = useField(formikFieldName);
	const { setValue } = field[2];

	const formatOptionLabel = (
		props: Dropdown,
		meta: FormatOptionLabelMeta<Dropdown>,
	) => {
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
					{props.value}
				</div>
			</div>
		);
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
			onChange={(option) => setValue(option?.value)}
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
