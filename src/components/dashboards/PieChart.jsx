import { Chart as ChartJSX, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import PropTypes from "prop-types"; // Importar PropTypes para validaciones

ChartJSX.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRadio: false,
};

export default function Pies({ dataPure }) {
  const bolsaDinero = [];
  const bolsaNombre = [];
  dataPure.forEach((cat) => {
    bolsaDinero.push(cat.walletAmount);
    bolsaNombre.push(cat.walletName);
  });
  const data = {
    labels: bolsaNombre,
    datasets: [
      {
        label: "Mercado",
        data: bolsaDinero,
        backgroundColor: [
          "rgba(245, 203, 167, 0.4)",
          "rgba(249, 231, 159, 0.4)",
          "rgba(162, 217, 206, 0.4)",
          "rgba(174, 214, 241, 0.4)",
          "rgba(210, 180, 222, 0.4)",
        ],
        borderColor: [
          "rgba(245, 203, 167, 1)",
          "rgba(249, 231, 159, 1)",
          "rgba(162, 217, 206, 1)",
          "rgba(174, 214, 241, 1)",
          "rgba(210, 180, 222, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} options={options} />;
}

// Definir la validación de las propiedades
Pies.propTypes = {
  dataPure: PropTypes.arrayOf(
    PropTypes.shape({
      walletAmount: PropTypes.number.isRequired,
      walletName: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
