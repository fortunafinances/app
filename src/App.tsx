import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApplicationLayout from "./components/layout/application";
// import UnauthenticatedHomepage from "./pages/unauthenticatedHomepage";
import Buy from "./pages/Buy";
import Overview from "./pages/application views/overview";
import Holdings from "./pages/application views/holdings";
import NoMatch from "./components/noMatch";

function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Buy />} />
        <Route path="/app">
          <Route path=":userId" element={<ApplicationLayout />}>
            <Route index element={<Overview />} />
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
