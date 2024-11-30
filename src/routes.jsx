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

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Rutas que no usan el layout (sin Sidebar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<SingUp />} />

        {/* Rutas que usan el layout con Sidebar */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/categories" element={<CategoryPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
