import { twMerge } from "tailwind-merge";

interface Props {
	className?: string;
}

export default function DataContainer({
	children,
	className,
}: React.PropsWithChildren<Props>) {
	return (
		<div
			className={twMerge(
				"bg-gray-200 rounded-md border-black border w-full p-1",
				className
			)}
		>
			{children}
		</div>
	);
}
