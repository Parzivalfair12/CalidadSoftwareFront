import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import type { TooltipItem } from "chart.js";

ChartJS.register(Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface ChartEvaluation {
  _id?: string;
  result?: number;
  projectId: string | { name: string };
  status: "Borrador" | "Completado" | "Aprobado" | "Rechazado";
}

interface Props {
  evaluations: ChartEvaluation[];
}

const EvaluationChart: React.FC<Props> = ({ evaluations }) => {
  const validEvaluations = evaluations
    .filter((evaluation) => evaluation.result !== undefined)
    .map((evaluation) => ({
      ...evaluation,
      _id: evaluation._id || "no-id",
      result: evaluation.result || 0,
    }));

  const backgroundColors = [
    "#FF6384", // Rojo
    "#36A2EB", // Azul
    "#FFCE56", // Amarillo
    "#4BC0C0", // Verde-azulado
    "#9966FF", // Morado
  ];

  const data = {
    labels: validEvaluations.map((item) =>
      typeof item.projectId === "string"
        ? "Proyecto sin nombre"
        : item.projectId.name
    ),
    datasets: [
      {
        label: "Resultado (%)",
        data: validEvaluations.map((item) => item.result),
        backgroundColor: backgroundColors.slice(0, validEvaluations.length),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"bar">) =>
            `${context.label}: ${context.raw}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Porcentaje (%)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Proyectos evaluados",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
        Resultados de Evaluaciones por Proyecto
      </h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default EvaluationChart;
