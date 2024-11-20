import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//components
import Layout from "./components/Layout/layout";

//pages
import Login from "./pages/Login/Login";
import SingUp from "./pages/Login/SingUp";
import HomePage from "./pages/HomePage/HomePage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta que usa el layout */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<SingUp />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/categories" element={<CategoryPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
