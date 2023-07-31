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

export const getMostRecentMonths = (dates: string[], num: number): string[] => {
	const dateObjects = dates.map((date) => new Date(date));

	dateObjects.sort((a, b) => b.getTime() - a.getTime());

	const recentMonths: string[] = []; 
	let count = 0;

	for (const date of dateObjects) {
		const year = date.getFullYear();
		const month = ("0" + (date.getMonth() + 1)).slice(-2);
		const monthYear = `${year}-${month}`;

		if (!recentMonths.includes(monthYear)) {
			recentMonths.push(monthYear);
			count++;
		}

		if (count === num) {
			break;
		}
	}
	dateObjects.sort((a, b) => a.getTime() - b.getTime()); 

	const formattedDates = dateObjects
		.filter((date) => recentMonths.includes(`${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}`))
		.map((date) => date.toISOString().split("T")[0]);

	return formattedDates;
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