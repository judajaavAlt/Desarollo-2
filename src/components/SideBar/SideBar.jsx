// src/components/Sidebar.jsx

import { NavLink, useNavigate } from "react-router-dom";
import "./sideBar.css"; // Importamos los estilos
import { useAuth } from "../../context/useAuth";

// Importamos los íconos
import logoIcon from "../../assets/icons/logo.png";
import homeIcon from "../../assets/icons/home.png";
import walletIcon from "../../assets/icons/wallet.png";
import categoriesIcon from "../../assets/icons/categories.png";
import logoutIcon from "../../assets/icons/logout.png";

export default function Sidebar() {
  const navigate = useNavigate();
  const { userDocData, setUserDocData } = useAuth();


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
        {`${userDocData.name} => ${userDocData["email"]}`}
        <button onClick={handleSignOut}>
          <img src={logoutIcon} alt="Logout Icon" className="icon" />{" "}
          {/* Icono de Logout */}
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
