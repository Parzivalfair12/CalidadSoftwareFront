import { useState, useEffect } from "react";
import { getEvaluations } from "../../Api/EvaluationsApi";
import { type Evaluation } from "../../Types/Index";
import EvaluationChart from "../../Components/Evaluation/EvaluationChart";
import { LineChart } from "../../Components/Evaluation/EvaluationChartBar";

export default function EvaluationChartView() {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        setIsLoading(true);
        const data = await getEvaluations();
        setEvaluations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvaluations();
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <p>Cargando gráficos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          color: "#721c24",
          backgroundColor: "#f8d7da",
          border: "1px solid #f5c6cb",
          borderRadius: "4px",
          margin: "20px",
        }}
      >
        <p style={{ marginBottom: "15px" }}>Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: "8px 16px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#333",
        }}
      >
        Resultados de Evaluaciones
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "30px",
          alignItems: "start",
        }}
      >
        {/* Gráfico Circular */}
        <div
          style={{
            background: "white",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              marginBottom: "15px",
              color: "#444",
            }}
          >
            Distribución por Proyecto
          </h3>
          <EvaluationChart evaluations={evaluations} />
        </div>

        {/* Gráfico de Líneas */}
        <div
          style={{
            background: "white",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              marginBottom: "15px",
              color: "#444",
            }}
          >
            Evolución de Resultados
          </h3>
          <LineChart evaluations={evaluations} />
        </div>
      </div>
    </div>
  );
}
