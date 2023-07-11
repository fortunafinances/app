export default function SearchBar() {

	return (
		<form className="form-control grow mx-2">
			<input
				type="text"
				placeholder="Search"
				className="input focus-within:border-blue-400"
			></input>
		</form>
	);
}
