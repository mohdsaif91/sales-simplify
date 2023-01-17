import { Login } from "./pages/Auth/Login/Login";
import { HomePage } from "./pages/homepage/HomePage";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<Login from="Signup" />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
  // return <Login />
}

export default App;
