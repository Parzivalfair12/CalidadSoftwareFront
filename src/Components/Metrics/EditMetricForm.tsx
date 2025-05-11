import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import { getMetricById, updateMetric } from "../../Api/MetricsApi";
import type { MetricFormData } from "../../Types/Index";
import LoadingMessage from "../LoadingMessage";
import ErrorMessage from "../ErrorMessage";

export const EditMetricForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<MetricFormData>({
    caracteristica: "",
    subcaracteristica: "",
    metrica: "",
    descripcion: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetric = async () => {
      try {
        if (id) {
          const data = await getMetricById(id);
          setFormData({
            caracteristica: data.caracteristica,
            subcaracteristica: data.subcaracteristica,
            metrica: data.metrica,
            descripcion: data.descripcion || "",
          });
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateMetric(id, formData);
        navigate("/metrics", {
          state: { message: "Métrica actualizada correctamente" },
        });
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Error al actualizar la métrica"
      );
    }
  };

  if (loading) return <LoadingMessage />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="form-container">
      <h2>
        <FontAwesomeIcon icon={faEdit} className="mr-2" />
        Editar Métrica
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Característica:</label>
          <input
            type="text"
            name="caracteristica"
            value={formData.caracteristica}
            onChange={handleChange}
            required
            maxLength={50}
          />
        </div>

        <div className="form-group">
          <label>Subcaracterística:</label>
          <input
            type="text"
            name="subcaracteristica"
            value={formData.subcaracteristica}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Métrica:</label>
          <input
            type="text"
            name="metrica"
            value={formData.metrica}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción (opcional):</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/metrics")}
            className="btn btn-secondary"
          >
            <FontAwesomeIcon icon={faTimes} className="mr-2" />
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            <FontAwesomeIcon icon={faSave} className="mr-2" />
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};
