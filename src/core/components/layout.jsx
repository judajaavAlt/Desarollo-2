// src/Layout.jsx
import Sidebar from "./SideBar";
import { Outlet } from "react-router-dom";
import "../styles/layout.css";

export default function Layout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
