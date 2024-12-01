import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//components
import Layout from "../core/components/layout";

//pages
import Login from "../features/Login/pages/Login";
import SingUp from "../features/Login/pages/SingUp";
import HomePage from "../features/home/pages/HomePage";
import CategoryPage from "../features/category/pages/CategoryPage";
import WalletPage from "../features/wallets/pages/walletPage";

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
          <Route path="/wallets" element={<WalletPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
