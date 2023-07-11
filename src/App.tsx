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
import NoMatch from "./components/utility/noMatch";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
	uri: "http://localhost:5000/graphql",
	cache: new InMemoryCache(),
});

export default function App() {
	return (
		<ApolloProvider client={client}>
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
		</ApolloProvider>
	);
}
