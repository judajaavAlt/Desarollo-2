// src/components/Sidebar.jsx

import { NavLink } from 'react-router-dom';
import './sidebar.css'; // Importamos los estilos

// Importamos los íconos
import logoIcon from '../../assets/icons/logo.png';
import homeIcon from '../../assets/icons/home.png';
import walletIcon from '../../assets/icons/wallet.png';
import categoriesIcon from '../../assets/icons/categories.png';
import logoutIcon from '../../assets/icons/logout.png';

export default function Sidebar() {
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
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              <img src={homeIcon} alt="Home Icon" className="icon" /> {/* Icono Home */}
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/wallets" className={({ isActive }) => (isActive ? "active" : "")}>
              <img src={walletIcon} alt="Wallet Icon" className="icon" /> {/* Icono Billetera */}
              Billeteras
            </NavLink>
          </li>
          <li>
            <NavLink to="/categories" className={({ isActive }) => (isActive ? "active" : "")}>
              <img src={categoriesIcon} alt="Categories Icon" className="icon" /> {/* Icono Categorías */}
              Categorías
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/logout">
          <img src={logoutIcon} alt="Logout Icon" className="icon" /> {/* Icono de Logout */}
          Cerrar Sesión
        </NavLink>
      </div>
    </div>
  );
}
