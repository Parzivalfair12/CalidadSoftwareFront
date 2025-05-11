import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProject,
  getProjectById,
  updateProject,
} from "../../Api/ProjectsApi";
import { type ProjectFormData } from "../../Types/Index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProjectFormData>({
    name: "",
    description: "",
    status: "Aprobado",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const loadProjectData = async () => {
        setIsLoading(true);
        try {
          const response = await getProjectById(id);
          const project = response;

          setFormData({
            name: project.name,
            description: project.description,
            status: project.status,
            startDate: project.startDate
              ? project.startDate.split("T")[0]
              : new Date().toISOString().split("T")[0],
            endDate: project.endDate ? project.endDate.split("T")[0] : "",
          });
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Error al cargar el proyecto"
          );
        } finally {
          setIsLoading(false);
        }
      };
      loadProjectData();
    }
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "Aprobado" | "Revisión" | "No Aprobado";
    setFormData((prev) => ({ ...prev, status: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (id) {
        // Modo edición
        await updateProject(id, {
          ...formData,
        });
      } else {
        // Modo creación
        await createProject({
          ...formData,
        });
      }
      navigate("/projects");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `Error al ${id ? "actualizar" : "crear"} el proyecto`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="widget">
        <div className="widget-header">
          <h3 className="widget-title">
            {id ? "Editando Proyecto" : "Nueva Evaluación de Proyecto"}
          </h3>
        </div>
        <div className="text-center py-4">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
      </div>
    );
  }

  return (
    <div className="widget">
      <div className="widget-header">
        <h3 className="widget-title">
          {id ? "Editando Proyecto" : "Nueva Evaluación de Proyecto"}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="name">Nombre del Proyecto</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="form-control"
            rows={4}
          />
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="status">Estado</label>
            <div className="custom-select-wrapper">
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleStatusChange}
                className={`status-select ${(formData.status || "Aprobado")
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                <option value="Aprobado">Aprobado</option>
                <option value="Revisión">Revisión</option>
                <option value="No Aprobado">No Aprobado</option>
              </select>
              <div className="custom-select-arrow"></div>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="startDate">Fecha de Inicio</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="endDate">Fecha de Fin (Opcional)</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="form-control"
              min={formData.startDate}
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/projects")}
            disabled={isSubmitting}
          >
            <FontAwesomeIcon icon={faTimes} /> Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin /> Guardando...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faSave} />{" "}
                {id ? "Actualizar" : "Guardar"} Proyecto
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
