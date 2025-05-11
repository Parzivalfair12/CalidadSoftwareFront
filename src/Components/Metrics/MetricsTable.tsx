import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faPlusCircle,
  faEdit,
  faTrash,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getMetrics, deleteMetric } from "../../Api/MetricsApi";
import type { DashboardMetric } from "../../Types/Index";
import LoadingMessage from "../LoadingMessage";
import ErrorMessage from "../ErrorMessage";
import { useNavigate } from "react-router-dom";
import { ConfirmationModal } from "../ConfirmationModal";

export default function MetricsTable() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<DashboardMetric>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [metricToDelete, setMetricToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await getMetrics();
        setMetrics(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar las métricas"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const handleViewDetails = (metricId: string) => {
    navigate(`/metrics/${metricId}`);
  };

  const handleAddMetric = () => {
    navigate("/metrics/new");
  };

  if (loading) {
    return <LoadingMessage />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (metrics.length === 0) {
    return <div className="text-center py-4">No hay métricas disponibles</div>;
  }

  const handleDeleteClick = (metricId: string) => {
    setMetricToDelete(metricId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!metricToDelete) return;

    try {
      await deleteMetric(metricToDelete);
      // Actualizar el estado local eliminando la métrica
      setMetrics(metrics.filter((metric) => metric._id !== metricToDelete));
      setIsModalOpen(false);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Error al eliminar la métrica"
      );
      setIsModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setMetricToDelete(null);
    setIsModalOpen(false);
  };

  const handleEdit = (metricId: string) => {
    navigate(`/metrics/edit/${metricId}`);
  };

  return (
    <div className="widget">
      <div className="widget-header">
        <h3 className="widget-title">Métricas de Calidad</h3>
        <div className="widget-actions">
          <button className="btn btn-primary" onClick={handleAddMetric}>
            <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
            Agregar Métrica
          </button>
          <button className="btn btn-primary ml-2">
            <FontAwesomeIcon icon={faCog} className="mr-2" />
            Configurar
          </button>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Característica</th>
              <th>Subcaracterística</th>
              <th>Métrica</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => (
              <tr key={metric._id}>
                <td>{metric.caracteristica}</td>
                <td>{metric.subcaracteristica}</td>
                <td>{metric.metrica}</td>
                <td className="actions-cell">
                  <button
                    className="btn-icon"
                    title="Editar"
                    onClick={() => handleEdit(metric._id)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="btn-icon"
                    title="Eliminar"
                    onClick={() => handleDeleteClick(metric._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button
                    className="btn-icon"
                    title="Detalles"
                    onClick={() => handleViewDetails(metric._id)}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <ConfirmationModal
            isOpen={isModalOpen}
            title="Confirmar Eliminación"
            message="¿Estás seguro que deseas eliminar esta métrica? Esta acción no se puede deshacer."
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        </table>
      </div>
    </div>
  );
}
