// src/Layout.jsx
import Sidebar from '../Sidebar/sidebar';
import { Outlet } from 'react-router-dom';
import './layout.css';
import LineChart from '../dashboards/LineChart';
import Pie from '../dashboards/PieChart';
import { readWallet } from '../../helpers/portWallets';
import { useState, useEffect } from 'react';


export default function Layout() {
  const [dataWallet, setDataWallet] = useState([]);

  useEffect(() => {
    const traer = async () => {
      try {
        const obtener = await readWallet(1);
        setDataWallet(obtener);
      } catch (e) {
        console.error("Error al cargar categorías:", e);
      }
    };
    traer();
  }, []);
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="content">
        <Outlet />
        {/* <LineChart/> */}
        <Pie data={dataWallet}/>
      </div>
    </div>
  );
}
