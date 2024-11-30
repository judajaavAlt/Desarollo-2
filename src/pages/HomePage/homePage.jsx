import { React } from 'react';
import HomeGraphic from '../../components/Home/HomeGraphic';
import HomeMovementsList from '../../components/Home/HomeMovementsList';
import './homePage.css'; 

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Sección de los gráficos (parte superior) */}
      <section className="home-graphic-section">
        <HomeGraphic />
      </section>

      {/* Sección de la lista de movimientos (parte inferior) */}
      <section className="home-movements-section">
        <HomeMovementsList />
      </section>
    </div>
  );
};

export default HomePage;
