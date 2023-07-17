export function checkOverflow(elem: Element) {
	const elemWidth = elem.getBoundingClientRect().width;
	const parentWidth = elem.parentElement?.getBoundingClientRect().width;

	return parentWidth ? elemWidth > parentWidth : false;
}
