import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMetric } from "../../Api/MetricsApi";
import { type MetricFormData } from "../../Types/Index";

export const CreateMetricForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<MetricFormData>({
    caracteristica: "",
    subcaracteristica: "",
    metrica: "",
    descripcion: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMetric(formData);
      navigate("/metrics");
    } catch (error) {
      console.error("Error al crear la métrica:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Agregar Nueva Métrica</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Característica:</label>
          <input
            type="text"
            name="caracteristica"
            value={formData.caracteristica}
            onChange={handleChange}
            required
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
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            Guardar Métrica
          </button>
        </div>
      </form>
    </div>
  );
};
