// src/components/Sidebar.jsx

import { NavLink, useNavigate } from "react-router-dom";
import "./sideBar.css"; // Importamos los estilos
import { useAuth } from "../../context/AuthContext";

// Importamos los íconos
import logoIcon from "../../assets/icons/logo.png";
import homeIcon from "../../assets/icons/home.png";
import walletIcon from "../../assets/icons/wallet.png";
import categoriesIcon from "../../assets/icons/categories.png";
import logoutIcon from "../../assets/icons/logout.png";

export default function Sidebar() {
  const navigate = useNavigate();
  const { auserData, setUserDocData } = useAuth();

  const userData = [
    { userID: 3, name: "Usuario" },
  ]; /*JSON.parse(localStorage.getItem("user"));*/
  const usuario_id = userData[0]["userID"];

  const handleSignOut = async () => {
    try {
      setUserDocData(null);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logoIcon} alt="Catmoney Logo" className="logo" /> {/* Logo */}
        <h2>Catmoney</h2>
      </div>

      <div className="sidebar-user">
        <h3>Michi Cat Mochi</h3> {/* Nombre del usuario */}
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <img src={homeIcon} alt="Home Icon" className="icon" />{" "}
              {/* Icono Home */}
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/wallets"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <img src={walletIcon} alt="Wallet Icon" className="icon" />{" "}
              {/* Icono Billetera */}
              Billeteras
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/categories"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <img
                src={categoriesIcon}
                alt="Categories Icon"
                className="icon"
              />{" "}
              {/* Icono Categorías */}
              Categorías
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        {`${userData[0]["name"]} => ${usuario_id}`}
        <button onClick={handleSignOut}>
          <img src={logoutIcon} alt="Logout Icon" className="icon" />{" "}
          {/* Icono de Logout */}
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
