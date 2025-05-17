import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

interface ChartEvaluation {
  _id?: string;
  result?: number;
  projectId: string | { name: string };
  status: "Borrador" | "Completado" | "Aprobado" | "Rechazado";
}
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);
const backgroundColors = [
  "#FF6384", // Rojo
  "#36A2EB", // Azul
  "#FFCE56", // Amarillo
  "#4BC0C0", // Verde-azulado
  "#9966FF", // Morado
];
export const LineChart: React.FC<{ evaluations: ChartEvaluation[] }> = ({
  evaluations,
}) => {
  const validData = evaluations
    .filter((e) => e.result !== undefined)
    .map((e) => ({
      label:
        typeof e.projectId === "string"
          ? "Proyecto sin nombre"
          : e.projectId.name,
      value: e.result || 0,
    }));

  const data = {
    labels: validData.map((e) => e.label),
    datasets: [
      {
        label: "Resultado (%)",
        data: validData.map((e) => e.value),
        borderColor: "#36A2EB",
        backgroundColor: backgroundColors,
        tension: 0.3,
        fill: true,
        pointBackgroundColor: backgroundColors,
      },
    ],
  };

  const options = {
    scales: {
      y: { max: 100, title: { display: true, text: "Porcentaje (%)" } },
    },
  };

  return <Line data={data} options={options} />;
};
