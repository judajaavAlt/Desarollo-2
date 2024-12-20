// src/Layout.jsx
import Sidebar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import "./layout.css";

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
