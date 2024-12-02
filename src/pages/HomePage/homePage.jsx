import HomeGraphic from "../../components/Home/HomeGraphic";
import "./homePage.css";
import { readWallet } from "../../helpers/portWallets";
import { useState, useEffect } from "react";
import Pies from "../../components/dashboards/PieChart";

const HomePage = () => {
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
    <div className="home-page">
      <section className="home-graphic-section">
        <HomeGraphic />
        <Pies dataPure={dataWallet} />
      </section>
    </div>
  );
};

export default HomePage;
