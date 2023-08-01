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

export const subtractMonths = (date: Date, months: number) => {
  // 👇 Make copy with "Date" constructor
  const dateCopy = new Date(date);

	if(months < 1) {
		dateCopy.setDate(dateCopy.getDay() - months * 10);
	} else {
		dateCopy.setMonth(dateCopy.getMonth() - months);
	}

  return dateCopy;
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
export const mobile = window.innerWidth < 640;

export const capitalize = (str: string | undefined) => {
	if(!str) return ""
	return str.charAt(0).toUpperCase()
  + str.slice(1)}