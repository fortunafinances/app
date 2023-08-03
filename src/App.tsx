import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import ApplicationLayout from "./components/layout/application";
import Overview from "./pages/application views/overview";
import Holdings from "./pages/application views/holdings";
import UnauthenticatedHomepage from "./pages/unauthenticatedHomepage";
import { ApolloClient, ApolloProvider, useReactiveVar } from "@apollo/client";
import Activity from "./pages/application views/activity";
import Callback from "./pages/callback";
import Trade from "./pages/application views/trade";
import cache from "./utilities/graphQL";
import Orders from "./pages/application views/orders";
import CreateProfile from "./pages/createProfile";
import CreateAccount from "./pages/createAccount";
import StockRecommendation from "./pages/application views/StockRecommendation";
import ProfileInfo from "./pages/profileInfo";
import StockResults from "./pages/application views/stockResults";
import PrivacyPolicy from "./pages/privacyPolicy";
import { currentAccountId } from "./utilities/reactiveVariables";
import { useEffect } from "react";

const client = new ApolloClient({
	uri: import.meta.env.DEV ? "http://127.0.0.1:80/graphql" : "https://wwapxkpzsg.us-east-1.awsapprunner.com/graphql",
	cache,
});

export default function App() {
	const currAccount = useReactiveVar(currentAccountId);
	useEffect(() => {
	}, [currAccount]);
	return (
		<ApolloProvider client={client}>
			<Router>
				<Routes>
					<Route index element={<UnauthenticatedHomepage />} />
					<Route path="/app" element={<ApplicationLayout />}>
						<Route
							index
							element={<Navigate to="overview" replace />}
						/>
						<Route path="overview" element={<Overview />} />
						<Route path="holdings" element={<Holdings />} />
						<Route path="activity" element={<Activity />} />
						<Route path="orders" element={<Orders />} />
						<Route path="trade" element={<Trade />} />
						{/* <Route path="editProfile" element={<ProfileInfo />} /> */}
						<Route
							path="*"
							element={<Navigate to="overview" replace />}
						/>
					</Route>
					<Route path="/callback" element={<Callback />} />
					<Route path="/createProfile" element={<CreateProfile />} />
					<Route path="/createAccount" element={<CreateAccount />} />
					<Route path="/profileInfo" element={<ProfileInfo />} />
					<Route path="/stockRecommendation" element={<StockRecommendation />} />
					<Route path="/stockResults" element={<StockResults />} />
					<Route path="/privacyPolicy" element={<PrivacyPolicy />} />
				</Routes>
			</Router>
		</ApolloProvider>
	);
}
