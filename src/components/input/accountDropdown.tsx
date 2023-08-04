import { useReactiveVar } from "@apollo/client/react/hooks/useReactiveVar";
import { BsChevronDown } from "react-icons/bs";
import { currentAccountId } from "../../utilities/reactiveVariables";
import { Account } from "../../utilities/types";
import { ApolloError } from "@apollo/client";
import { Link } from "react-router-dom";

export interface DropdownProps {
	data: Account[] | undefined;
	loading: boolean;
	error: ApolloError | undefined;
}

const AccountDropdown = ({ data, loading, error }: DropdownProps) => {
	const currentAccountNumber = useReactiveVar(currentAccountId);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error</div>;

	const currentAccount = data?.find(
		(a) => Number(a.accId) === Number(currentAccountNumber),
	);

	if (!data || data.length === 0 || !currentAccount) {
		return <div className="text-red-400">Error getting accounts</div>;
	}

	const handleClick = (index: number) => {
		const elem = document.activeElement;
		if (elem && elem instanceof HTMLElement) {
			elem?.blur();
		}
		currentAccountId(index);
	};

	return (
		<div
			className="flex flex-col items-center dropdown text-black w-full sm:w-[200px]"
			title={currentAccount.name}
		>
			<label
				tabIndex={0}
				className="btn bg-white outline-none lg:rounded-tl-none rounded-tl-lg rounded-tr-lg b-0 lg:rounded-b-none normal-case text-xl flex flex-row w-56 sm:w-full flex-nowrap justify-center sm:justify-between"
			>
				<div className="relative top-[50%] -translate-y-[15px] h-full max-w-[90%]">
					<p className="truncate max-w-full h-full">
						{currentAccount.name}
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
					<Link
						to="/createAccount"
						className="truncate max-w-full inline text-center"
					>
						+
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default AccountDropdown;
