import HomeGraphic from "../../components/Home/HomeGraphic";
import "./homePage.css";
import { readWallet } from "../../helpers/portWallets";
import { useState, useEffect } from "react";
import Pies from "../../components/dashboards/PieChart";

import { useAuth } from "../../context/AuthContext";

const HomePage = () => {
  const [dataWallet, setDataWallet] = useState([]);
  const { userDocData } = useAuth();

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

  console.log(userDocData);

  return (
    <div className="home-page">
      <section className="home-graphic-section">
        <HomeGraphic />
        <Pies dataPure={dataWallet} />
      </section>
    </div>
  );
};

export default HomePage;
