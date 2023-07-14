import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { makeVar } from "@apollo/client/cache";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

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