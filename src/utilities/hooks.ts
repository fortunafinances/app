import { makeVar } from "@apollo/client/cache";

export function makeVarPersisted<T>(key: string, initialValue: T) {
	const variable = makeVar<T>(initialValue);

	function handleOnChangeEvent(data: T) {
		localStorage.setItem(key, JSON.stringify(data));
		variable.onNextChange(handleOnChangeEvent);
	}

	function restore() {
		const previousValue = localStorage.getItem(key);
		if (previousValue) {
			variable(JSON.parse(previousValue) as unknown as T);
		}
	}

	restore();
	variable.onNextChange(handleOnChangeEvent);
	return variable;
}
