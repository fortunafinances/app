import { makeVar } from "@apollo/client/cache";
import { useState, useEffect, useCallback } from "react";

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

interface Size {
	width: number | undefined;
	height: number | undefined;
}

export function useWindowSize(): Size {
	const isClient = typeof window === "object";

	const getSize = useCallback(() => {
		return {
			width: isClient ? window.innerWidth : undefined,
			height: isClient ? window.innerHeight : undefined,
		};
	}, [isClient]);

	const [windowSize, setWindowSize] = useState<Size>(getSize());

	useEffect(() => {
		if (!isClient) {
			return;
		}

		function handleResize() {
			// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
			const vh = window.innerHeight * 0.01;
			// Then we set the value in the --vh custom property to the root of the document
			document.documentElement.style.setProperty("--vh", `${vh}px`);
			setWindowSize(getSize());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [getSize, isClient]);

	return windowSize;
}
