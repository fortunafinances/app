export const preventMinus = (e: React.KeyboardEvent<HTMLInputElement>) => {
	if (e.code === "Minus") {
		e.preventDefault();
	}
};

export const percentChange = (curr: number, prev: number): string => {
	const formatter = new Intl.NumberFormat("en-US", {
		maximumSignificantDigits: 2,
	});

	return formatter.format(((curr - prev) / prev) * 100);
};

export const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	const formatter = new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
	});

	return formatter.format(date);
};

export const sortDate = (a: string, b: string): number => {
	return new Date(a) >= new Date(b) ? 1 : -1;
};

export const getMostRecentMonths = (num: number) => {
	const today = new Date(); // Get today's date
	const months = []; // Create an empty array for the months
	// add month into months
	for (let i = 1; i <= num; i++) {
		const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
		months.push(month.toLocaleString("default", { month: "long" }));
	}
	return months.reverse();
}

export const filterInclusive = (
	row: { getValue: (id: string) => number },
	id: string,
	filterValue: number[] | string[],
) => {
	const value = row.getValue(id);
	let [min, max] = filterValue;
	if (min === undefined || min === "") min = Number.NEGATIVE_INFINITY;
	if (max === undefined || max === "") max = Number.POSITIVE_INFINITY;

	return value >= Number(min) && value <= Number(max);
};

export const getCurrentPath = (path: string): string => {
	return path.split("/")[path.split("/").length - 1];
};