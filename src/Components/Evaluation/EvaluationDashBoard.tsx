import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Save, ArrowLeft } from "lucide-react";
import { getProjects } from "../../Api/ProjectsApi";
import { getMetrics } from "../../Api/MetricsApi";
import { saveEvaluation as apiSaveEvaluation } from "../../Api/EvaluationsApi";
import {
  type Project,
  type Metric,
  type Evaluation,
  type EvaluationMetric,
} from "../../Types/Index";

export default function EvaluationDashBoard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState({ projects: true, metrics: true });
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [evaluation, setEvaluation] = useState<Evaluation>({
    projectId: "",
    date: new Date().toISOString().split("T")[0],
    metrics: [],
    status: "Borrador",
    description: "",
    notes: "",
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, metricsData] = await Promise.all([
          getProjects(),
          getMetrics(),
        ]);

        setProjects(projectsData);
        setMetrics(metricsData);
        setLoading({ projects: false, metrics: false });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        console.error("Error al cargar datos:", err);
        setLoading({ projects: false, metrics: false });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (evaluation.projectId && metrics.length > 0) {
      const project = projects.find((p) => p._id === evaluation.projectId);
      setSelectedProject(project || null);

      setEvaluation((prev) => ({
        ...prev,
        metrics: metrics.map(
          (metric) =>
            ({
              metricId: metric._id,
              metricName: metric.metrica,
              characteristic: metric.caracteristica,
              subcharacteristic: metric.subcaracteristica,
              value: 0,
              observations: "",
            } as EvaluationMetric)
        ),
        projectName: project?.name,
      }));
    }
  }, [evaluation.projectId, projects, metrics]);

  const calculateResult = () => {
    if (evaluation.metrics.length === 0) return 0;

    const total = evaluation.metrics.reduce((sum, metric) => {
      return sum + metric.value;
    }, 0);

    return total / evaluation.metrics.length;
  };

  const updateMetricValue = (metricId: string, value: number) => {
    setEvaluation((prev) => ({
      ...prev,
      metrics: prev.metrics.map((m) =>
        m.metricId === metricId ? { ...m, value } : m
      ),
    }));
  };

  const updateMetricObservations = (metricId: string, observations: string) => {
    setEvaluation((prev) => ({
      ...prev,
      metrics: prev.metrics.map((m) =>
        m.metricId === metricId ? { ...m, observations } : m
      ),
    }));
  };

  const handleSaveEvaluation = async (
    status: Evaluation["status"] = "Borrador"
  ) => {
    setIsSaving(true);
    setSaveError(null);

    try {
      const result = calculateResult();
      const completeEvaluation: Evaluation = {
        ...evaluation,
        result,
        status,
        date: evaluation.date, 
        description: evaluation.description || "Evaluación sin descripción",
      };

      await apiSaveEvaluation(completeEvaluation);

      if (status !== "Borrador") {
        navigate("/evaluation");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido al guardar";
      setSaveError(errorMessage);
      console.error("Error al guardar evaluación:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const getValueColor = (value: number) => {
    if (value >= 80) return "color-green";
    if (value >= 60) return "color-yellow";
    return "color-red";
  };

  if (loading.projects || loading.metrics) {
    return <div className="loading-container">Cargando datos...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }
  return (
    <div className="evaluation-container">
      {saveError && (
        <div className="error-message">Error al guardar: {saveError}</div>
      )}
      <div className="evaluation-header">
        <div className="header-left">
          <button
            className="back-button"
            onClick={() => navigate("/evaluation")}
          >
            <ArrowLeft className="icon" />
          </button>
          <h1>Nueva Evaluación de Proyecto</h1>
        </div>
        <div className="header-actions">
          <button
            className="secondary-button"
            onClick={() => handleSaveEvaluation("Borrador")}
            disabled={isSaving}
          >
            {isSaving ? "Guardando..." : "Guardar Borrador"}
          </button>
          <button
            className="primary-button"
            onClick={() => handleSaveEvaluation("Completado")}
            disabled={isSaving}
          >
            <Save className="icon" />
            {isSaving ? "Guardando..." : "Finalizar Evaluación"}
          </button>
        </div>
      </div>

      <div className="evaluation-card">
        <div className="card-header">
          <h2>Evaluación de Calidad ISO 25010</h2>
          <p>
            Evalúe el proyecto seleccionado utilizando las métricas de calidad
            definidas
          </p>
        </div>
        <div className="card-content">
          <div className="grid-container">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="project">Proyecto</label>
                <select
                  id="project"
                  value={evaluation.projectId}
                  onChange={(e) =>
                    setEvaluation((prev) => ({
                      ...prev,
                      projectId: e.target.value,
                    }))
                  }
                >
                  <option value="">Seleccione un proyecto</option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="date">Fecha de Evaluación</label>
                <input
                  id="date"
                  type="date"
                  value={evaluation.date}
                  onChange={(e) =>
                    setEvaluation((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            {selectedProject && (
              <div className="tabs-container">
                <div className="tabs-header">
                  <button
                    className={`tab-button ${
                      activeTab === "general" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("general")}
                  >
                    Información General
                  </button>
                  <button
                    className={`tab-button ${
                      activeTab === "metrics" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("metrics")}
                  >
                    Evaluación de Métricas
                  </button>
                </div>

                {activeTab === "general" && (
                  <div className="tab-content">
                    <div className="info-grid">
                      <div>
                        <h3>Detalles del Proyecto</h3>
                        <div className="info-details">
                          <div>
                            <span className="info-label">Nombre:</span>{" "}
                            {selectedProject.name}
                          </div>
                          <div>
                            <span className="info-label">Fecha de inicio:</span>{" "}
                            {new Date(
                              selectedProject.startDate
                            ).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="info-label">Estado:</span>{" "}
                            {selectedProject.status}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3>Descripción</h3>
                        <p className="project-description">
                          {selectedProject.description || "Sin descripción"}
                        </p>
                      </div>
                    </div>

                    <div className="notes-section">
                      <h3>Notas de Evaluación</h3>
                      <textarea
                        placeholder="Ingrese notas generales sobre la evaluación"
                        rows={4}
                      />
                    </div>
                  </div>
                )}

                {activeTab === "metrics" && (
                  <div className="tab-content">
                    {metrics.map((metric) => {
                      const evaluationMetric = evaluation.metrics.find(
                        (m) => m.metricId === metric._id
                      );
                      const value = evaluationMetric
                        ? evaluationMetric.value
                        : 0;

                      return (
                        <div key={metric._id} className="metric-card">
                          <div className="metric-header">
                            <div>
                              <h3>{metric.metrica}</h3>
                              <p className="metric-subtitle">
                                {metric.caracteristica} &gt;{" "}
                                {metric.subcaracteristica}
                              </p>
                            </div>
                            <div
                              className={`metric-value ${getValueColor(value)}`}
                            >
                              {value}%
                            </div>
                          </div>
                          <div className="metric-content">
                            <div className="metric-controls">
                              <p className="metric-description">
                                {metric.descripcion}
                              </p>
                              <div className="slider-container">
                                <div className="slider-wrapper">
                                  <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="5"
                                    value={value}
                                    onChange={(e) =>
                                      updateMetricValue(
                                        metric._id,
                                        Number(e.target.value)
                                      )
                                    }
                                  />
                                </div>
                                <div className="slider-input">
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={value}
                                    onChange={(e) =>
                                      updateMetricValue(
                                        metric._id,
                                        Number(e.target.value)
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="metric-notes">
                              <label htmlFor={`observations-${metric._id}`}>
                                Observaciones
                              </label>
                              <textarea
                                id={`observations-${metric._id}`}
                                placeholder="Ingrese observaciones sobre esta métrica"
                                value={evaluationMetric?.observations || ""}
                                onChange={(e) =>
                                  updateMetricObservations(
                                    metric._id,
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className="result-card">
                      <div className="result-header">
                        <h3>Resultado de la Evaluación</h3>
                      </div>
                      <div className="result-content">
                        <div>
                          <p className="result-description">
                            Calificación general basada en las métricas
                            evaluadas
                          </p>
                        </div>
                        <div
                          className={`result-value ${getValueColor(
                            calculateResult()
                          )}`}
                        >
                          {calculateResult().toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="card-footer">
          <button
            className="secondary-button"
            onClick={() => navigate("/evaluation")}
            disabled={isSaving}
          >
            Cancelar
          </button>
          <div className="footer-actions">
            <button
              className="secondary-button"
              onClick={() => handleSaveEvaluation("Borrador")}
              disabled={isSaving}
            >
              {isSaving ? "Guardando..." : "Guardar Borrador"}
            </button>
            <button
              className="primary-button"
              onClick={() => handleSaveEvaluation("Completado")}
              disabled={isSaving}
            >
              {isSaving ? "Guardando..." : "Finalizar Evaluación"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
