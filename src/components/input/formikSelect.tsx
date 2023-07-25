import Select from "react-select";
import { useField } from "formik";

type Props = {
	selectOptions: { label: string; value: string }[];
	formikFieldName: string;
	placeholder?: string;
};

/**
 * React Select but hooked into Formik
 * @returns {JSX.Element}
 * @constructor
 */
export default function FormikSelect({
	selectOptions,
	formikFieldName,
	placeholder,
}: Props) {
	const [field, _, helpers] = useField(formikFieldName);
	const { setValue } = helpers;

	return (
		<Select
			defaultValue={selectOptions.find(
				(option) => option.value === field.value
			)}
			options={selectOptions}
			placeholder={placeholder}
			onBlur={field.onBlur}
			onChange={(option) => setValue(option?.value)}
		/>
	);
}

FormikSelect.defaultProps = {
	placeholder: "",
};
