export const formatCentsToDollars = (currency: number) => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	return formatter.format(currency / 100);
};

export function filterPriceRange(
	fieldValue: number,
	_columnIds: string,
	filterValue: number[]
): boolean {
	const min = filterValue[0] ? filterValue[0] * 100 : 0;
	const max = filterValue[1] ? filterValue[1] * 100 : Number.POSITIVE_INFINITY;
	return fieldValue >= min && fieldValue <= max;
}
