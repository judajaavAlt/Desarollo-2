import { Chart as ChartJSX, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";


ChartJSX.register(ArcElement, Tooltip, Legend);


var options = {
  responsive: true,
  maintainAspectRadio: false,
};

export default function Pies(props) {
    //console.log(props.data)
    var bolsaDinero = [];
    var bolsaNombre = [];
    props.data.forEach(
      (cat) => {
        bolsaDinero.push(cat.walletAmount);
        bolsaNombre.push(cat.walletName)
      }
    );
    var data = {
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
