import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApplicationLayout from "./components/layout/application";
import UnauthenticatedHomepage from "./pages/unauthenticatedHomepage";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<UnauthenticatedHomepage/>} />
				<Route path=":userId" element={<ApplicationLayout />} />
			</Routes>
		</Router>
	);
}

export default App;
