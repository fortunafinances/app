import { makeVar } from "@apollo/client/cache";

import { useState, useEffect } from 'react';


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
	const isClient = typeof window === 'object';
  
	function getSize(): Size {
	  return {
		width: isClient ? window.innerWidth : undefined,
		height: isClient ? window.innerHeight : undefined,
	  };
	}
  
	const [windowSize, setWindowSize] = useState<Size>(getSize);
  
	useEffect(() => {
	  if (!isClient) {
		return;
	  }
  
	  function handleResize() {
		setWindowSize(getSize());
	  }
  
	  window.addEventListener('resize', handleResize);
	  return () => window.removeEventListener('resize', handleResize);
	}, []); 
  
	return windowSize;
  }
