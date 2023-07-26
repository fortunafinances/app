import Select from "react-select";
import { useField } from "formik";

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
	const [field, _, helpers] = useField(formikFieldName);
	const { setValue } = helpers;

	return (
		<Select
			id={props.id}
			name={props.name}
			key={props.key}
			value={selectOptions.find((option) => option.value === field.value)}
			options={selectOptions}
			placeholder={placeholder}
			onBlur={field.onBlur}
			onChange={(option) => setValue(option?.value)}
			className="rounded-md outline outline-[1px] outline-secondary"
			styles={{
				control: (base) => ({
					...base,
					border: 0,
					// This line disable the blue border
					boxShadow: "none",
				}),
			}}
		/>
	);
}
