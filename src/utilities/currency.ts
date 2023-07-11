export const formatCentsToDollars = (currency: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

  return formatter.format(currency / 100);
}