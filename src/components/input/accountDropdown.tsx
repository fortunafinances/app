import { useReactiveVar } from "@apollo/client/react/hooks/useReactiveVar";
import { BsChevronDown } from "react-icons/bs";
import { currentAccountId } from "../../utilities/reactiveVariables";
import { Account } from "../../utilities/types";

export interface DropdownProps {
	data: Account[];
}

const AccountDropdown = ({ data }: DropdownProps) => {
	const currentAccountNumber = useReactiveVar(currentAccountId);

	const currentAccount = data.find(
		(a) => Number(a.accId) === Number(currentAccountNumber)
	);
	if (!data || data.length === 0 || !currentAccount) {
		console.log(currentAccount, currentAccountNumber);
		return <div className="text-red-400">Error getting accounts</div>;
	}

	const handleClick = (index: number) => {
		const elem = document.activeElement;
		if (elem && elem instanceof HTMLElement) {
			elem?.blur();
		}
		currentAccountId(index);
	};

	const appendAccount = () => {
		return !(currentAccount.name.split("").at(-1)?.toLowerCase() === "account");
	};

	return (
		<div
			className="dropdown mt-1 text-black capitalize"
			title={currentAccount.name + " Account"}
		>
			<label
				tabIndex={0}
				className="btn bg-white outline-none b-0 rounded-b-none normal-case w-full text-xl flex flex-row flex-nowrap justify-between"
			>
				<div className="relative top-[50%] -translate-y-[15px] h-full max-w-[90%] -left-2">
					<p className="truncate max-w-full h-full text-center capitalize">
						{currentAccount.name}
						{appendAccount() ? "" : " Account"}
					</p>
				</div>
				<BsChevronDown />
			</label>
			<ul
				tabIndex={0}
				className="dropdown-content menu p-2 shadow bg-white rounded-b-box w-full z-50 text-lg"
			>
				{data.map((item, i) => (
					<li key={i} className="w-full" title={item.name}>
						<a
							onClick={() => handleClick(item.accId)}
							className="truncate max-w-full inline-block"
						>
							{item.name}
						</a>
					</li>
				))}
				<li key={-1} className="w-full" title={"Add new account"}>
					<a
						onClick={() => {}}
						className="truncate max-w-full inline text-center"
					>
						+
					</a>
				</li>
			</ul>
		</div>
	);
};

export default AccountDropdown;
