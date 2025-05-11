import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMetricById } from "../../Api/MetricsApi";
import type { Metric } from "../../Types/Index";
import LoadingMessage from "../LoadingMessage";
import ErrorMessage from "../ErrorMessage";
import { Modal } from "../Modal";

export const MetricDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [metric, setMetric] = useState<Metric | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetric = async () => {
      try {
        if (id) {
          const data = await getMetricById(id);
          setMetric(data);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar la métrica"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMetric();
  }, [id]);

  if (loading) return <LoadingMessage />;
  if (error) return <ErrorMessage message={error} />;
  if (!metric) return <div>No se encontró la métrica</div>;

  return (
    <Modal>
      <div className="metric-details">
        <h2 className="metric-title">Detalles de la Métrica</h2>
        
        <div className="details-container">
          <div className="detail-row">
            <span className="detail-label">Característica:</span>
            <span className="detail-value">{metric.caracteristica}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Subcaracterística:</span>
            <span className="detail-value">{metric.subcaracteristica}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Métrica:</span>
            <span className="detail-value metric-name">{metric.metrica}</span>
          </div>
          
          {metric.descripcion && (
            <div className="detail-row description-row">
              <span className="detail-label">Descripción:</span>
              <span className="detail-value description-text">{metric.descripcion}</span>
            </div>
          )}
        </div>
        
        <div className="divider"></div>
        
        <div className="modal-actions">
          <button 
            className="modal-button"
            onClick={() => window.history.back()}
          >
            Volver
          </button>
        </div>
      </div>
    </Modal>
  );
};