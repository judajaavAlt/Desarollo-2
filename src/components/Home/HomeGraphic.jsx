import './HomeGraphic.css';

const HomeGraphic = () => {
  return (
    <div className="home-graphic">
      <h2>Tus Movimientos</h2>
      <div className="total-amount">
        <h3>Total: $1,000,000</h3>
      </div>
      <div className="graphics-container">
        <img src="../../assets/images/bar-graph-placeholder.png" alt="Gráfico de barras" />
        {/* Aquí puedes agregar una librería de gráficos para dibujar el gráfico */}
      </div>
    </div>
  );
};

export default HomeGraphic;