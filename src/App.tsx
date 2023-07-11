import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApplicationLayout from "./components/layout/application";
// import UnauthenticatedHomepage from "./pages/unauthenticatedHomepage";
import Buy from "./pages/Buy";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Buy" element={<Buy />} />
        <Route path="app">
          <Route path=":userId" element={<ApplicationLayout />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
