export const formatDollars = (currency: number): string => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		notation: "compact",
	});

	return formatter.format(currency);
};

export function filterRange(
	fieldValue: number,
	_columnIds: string,
	filterValue: number[]
): boolean {
	const min = filterValue[0] ? filterValue[0] : Number.NEGATIVE_INFINITY;
	const max = filterValue[1] ? filterValue[1] : Number.POSITIVE_INFINITY;
	return fieldValue >= min && fieldValue <= max;
}
