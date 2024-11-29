import { Line } from "react-chartjs-2";
import { readTransaction } from "../../helpers/portTransaccion";
import {
  Chart as ChartJSX,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJSX.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

var beneficios = [22,50,12,68,79,42,68,53,47,19,30,25]
var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

var midata = {
  labels: meses, // Etiquetas dinámicas
  datasets: [
    {
      label: "Monto de las transacciones",
      data: beneficios, // Datos dinámicos
      tension: 0.3,
      fill: true,
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      pointRadius: 5,
      pointBorderColor: "rgb(75, 192, 192)",
      pointBackgroundColor: "rgb(75, 192, 192)",
    },
  ],
};

var myoptions = {

};

export default function LineChart() {
  return <Line data={midata} options={myoptions}/>
}