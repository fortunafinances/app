import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import ApplicationLayout from "./components/layout/application";
import UnauthenticatedHomepage from "./pages/unauthenticatedHomepage";
// import Buy from "./pages/Buy";
import Overview from "./pages/application views/overview";
import Holdings from "./pages/application views/holdings";
<<<<<<< HEAD
import NoMatch from "./components/noMatch";
import UnauthenticatedHomepage from "./pages/unauthenticatedHomepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<UnauthenticatedHomepage />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/app">
          <Route path=":userId" element={<ApplicationLayout />} />
            <Route path="overview" element={<Overview />} />
            <Route path="holdings" element={<Holdings />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
=======
import NoMatch from "./components/utility/noMatch";

function App() {
	return (
		<Router>
			<Routes>
				<Route index path="/" element={<UnauthenticatedHomepage />} />
				<Route path="/app">
					<Route index element={<Navigate to="/" replace />} />
					<Route path=":userId" element={<ApplicationLayout />}>
						<Route index element={<Navigate to="overview" replace />} />
						<Route path="overview" element={<Overview />} />
						<Route path="holdings" element={<Holdings />} />
						<Route path="*" element={<NoMatch />} />
					</Route>
				</Route>
			</Routes>
		</Router>
	);
>>>>>>> e492fa08cdf0630e4de8419c62a74a902619388b
}

export default App;
