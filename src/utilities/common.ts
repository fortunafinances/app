// ############# VARIABLES ###############

export const dateOptions = [
	{ value: 0.7, label: "1 Week" },
	{ value: 1, label: "1 Month" },
	{ value: 3, label: "3 Months" },
	{ value: 6, label: "6 Months" },
	{ value: 12, label: "1 Year" },
	{ value: 24, label: "2 Years" },
];
export const navItems = ["overview", "trade", "holdings", "orders", "activity"];

// ############# FUNCTIONS ###############

export const isMobile = (windowSize: number | undefined): boolean => {
	const CUTOFF = 640;
	return windowSize !== undefined ? windowSize <= CUTOFF : false;
};

export const preventMinus = (e: React.KeyboardEvent<HTMLInputElement>) => {
	if (e.code === "Minus") {
		e.preventDefault();
	}
};

// ## FORMATTING ##
export const percentChange = (curr?: number, prev?: number): string => {
	const formatter = new Intl.NumberFormat("en-US", {
		maximumSignificantDigits: 2,
	});

	return formatter.format(((curr! - prev!) / prev!) * 100);
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

export const formatDollars = (currency: number | undefined): string => {
	if (!currency) return "$0.00";
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		notation: currency < 10_000_000 ? "standard" : "compact",
	});

	return formatter.format(currency);
};


export const capitalize = (str: string | undefined) => {
	if (!str) return "";
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const convertToRoundedPercentageChange = (
	dataPoints: { x: string; y: number }[],
) => {
	const firstPrice = dataPoints[0].y;
	const roundedPercentageChanges: { x: string; y: number }[] = [];

	for (let i = 0; i < dataPoints.length; i++) {
		const percentageChange =
			((dataPoints[i].y - firstPrice) / firstPrice) * 100;
		const roundedPercentageChange = Number(percentageChange.toFixed(2));
		roundedPercentageChanges.push({
			x: dataPoints[i].x,
			y: roundedPercentageChange,
		});
	}

	return roundedPercentageChanges;
};


// ### DATA MANIPULATION ###
export function filterRange(
	fieldValue: number,
	_columnIds: string,
	filterValue: number[],
): boolean {
	const min = filterValue[0] ? filterValue[0] : Number.NEGATIVE_INFINITY;
	const max = filterValue[1] ? filterValue[1] : Number.POSITIVE_INFINITY;
	return fieldValue >= min && fieldValue <= max;
}


export const sortDate = (a: string, b: string): number => {
	return new Date(a) >= new Date(b) ? 1 : -1;
};

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

export const subtractMonths = (date: Date, months: number) => {
	// 👇 Make copy with "Date" constructor
	const dateCopy = new Date(date);

	if (months < 1) {
		dateCopy.setDate(dateCopy.getDay() - months * 10);
	} else {
		dateCopy.setMonth(dateCopy.getMonth() - months);
	}

	return dateCopy;
};
