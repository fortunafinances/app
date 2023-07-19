export const preventMinus = (e: React.KeyboardEvent<HTMLInputElement>) => {
	if (e.code === "Minus") {
		e.preventDefault();
	}
};
