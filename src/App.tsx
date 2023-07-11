import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApplicationLayout from "./components/layout/application";
// import UnauthenticatedHomepage from "./pages/unauthenticatedHomepage";
import Buy from "./pages/Buy";
import Overview from "./pages/application views/overview";
import Holdings from "./pages/application views/holdings";
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
}

export default App;
