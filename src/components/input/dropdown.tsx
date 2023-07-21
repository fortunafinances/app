import { useReactiveVar } from "@apollo/client/react/hooks/useReactiveVar";
import { BsChevronDown } from "react-icons/bs";
import { currentAccountId } from "../../utilities/reactiveVariables";
import { Account } from "../../utilities/types";

export interface DropdownProps {
	data: Account[];
}

const Dropdown = ({ data }: DropdownProps) => {
	const currentAccountNumber = useReactiveVar(currentAccountId);

	const currentAccount = data.find((a) => a.accId === currentAccountNumber);

	const handleClick = (index: number) => {
		const elem = document.activeElement;
		if (elem && elem instanceof HTMLElement) {
			elem?.blur();
		}
		currentAccountId(index);
	};

	const appendAccount = () => {
		return !(
			currentAccount!.name.split("").at(-1)?.toLowerCase() === "account"
		);
	};

	return (
		<div
			className="dropdown m-2 text-black"
			title={currentAccount!.name + " Account"}
		>
			<label
				tabIndex={0}
				className="btn normal-case bg-base-200 w-full text-[1.1em] flex flex-row flex-nowrap justify-between"
			>
				<div className="relative top-[50%] -translate-y-[25%] h-full max-w-[90%] -left-2">
					<p className="truncate max-w-full h-full text-center">
						{currentAccount!.name}
						{appendAccount() ? "" : " Account"}
					</p>
				</div>
				<BsChevronDown />
			</label>
			<ul
				tabIndex={0}
				className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-full"
			>
				{data.map((item, i) => (
					<li
						key={i}
						className="w-full"
						title={item.name + appendAccount() ? " Account" : ""}
					>
						<a
							onClick={() => handleClick(item.accId)}
							className="truncate max-w-full inline-block"
						>
							{item.name}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Dropdown;
