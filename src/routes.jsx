import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//components
import Layout from "./components/Layout/layout";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/generics/PrivateRoute";

//pages
import Login from "./pages/Login/Login";
import SingUp from "./pages/Login/SingUp";
import HomePage from "./pages/HomePage/HomePage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import WalletPage from "./pages/WalletsPage/walletPage";

function AppRoutes() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas que no usan el layout (sin Sidebar) */}
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<SingUp />} />

          {/* Rutas que usan el layout con Sidebar */}
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<PrivateRoute element={HomePage} />} />
            <Route
              path="/categories"
              element={<PrivateRoute element={CategoryPage} />}
            />
            <Route
              path="/wallets"
              element={<PrivateRoute element={WalletPage} />}
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default AppRoutes;
