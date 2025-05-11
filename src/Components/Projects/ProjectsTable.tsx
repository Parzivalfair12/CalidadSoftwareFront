import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEye,
  faEdit,
  faTrash,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects, deleteProject } from "../../Api/ProjectsApi";
import type { Project } from "../../Types/Index";
import LoadingMessage from "../LoadingMessage";
import ErrorMessage from "../ErrorMessage";
import { ConfirmationModal } from "../ConfirmationModal";
import { ProjectDetailsModal } from "./ProjectDetailsModal";

export default function ProjectsTable() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpenDetail(true);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar proyectos"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDeleteClick = (projectId: string) => {
    setProjectToDelete(projectId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;

    try {
      await deleteProject(projectToDelete);
      setProjects(
        projects.filter((project) => project._id !== projectToDelete)
      );
      setIsModalOpen(false);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Error al eliminar proyecto"
      );
      setIsModalOpen(false);
    }
  };

  const handleEditProject = (projectId: string) => {
    navigate(`/projects/edit/${projectId}`);
  };

  const handleAddProject = () => {
    navigate("/projects/new");
  };

  if (loading) return <LoadingMessage />;
  if (error) return <ErrorMessage message={error} />;
  if (projects.length === 0) {
    return (
      <div className="widget">
        <div className="widget-header">
          <h3 className="widget-title">Evaluaciones Proyectos</h3>
          <div className="widget-actions">
            <button className="btn btn-primary" onClick={handleAddProject}>
              <FontAwesomeIcon icon={faPlus} /> Nueva Evaluación
            </button>
          </div>
        </div>
        <div className="text-center py-4">No hay proyectos disponibles</div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES");
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Aprobado":
        return "status-success";
      case "Revisión":
        return "status-warning";
      case "No Aprobado":
        return "status-danger";
      default:
        return "";
    }
  };

  return (
    <div className="widget">
      <div className="widget-header">
        <h3 className="widget-title">Evaluaciones Proyectos</h3>
        <div className="widget-actions">
          <button className="btn btn-primary" onClick={handleAddProject}>
            <FontAwesomeIcon icon={faPlus} /> Nueva Evaluación
          </button>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Proyecto</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td>{project.name}</td>
                <td>{formatDate(project.startDate)}</td>
                <td>
                  <span className={`status ${getStatusClass(project.status)}`}>
                    {project.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <button
                    className="icon-btn"
                    title="Ver detalles"
                    onClick={() => handleViewDetails(project)}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button
                    className="icon-btn"
                    title="Editar"
                    onClick={() => handleEditProject(project._id)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="icon-btn"
                    title="Eliminar"
                    onClick={() => handleDeleteClick(project._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button
                    className="icon-btn"
                    title="Descargar reporte"
                    onClick={() => console.log("Descargar", project._id)}
                  >
                    <FontAwesomeIcon icon={faDownload} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirmar Eliminación"
        message="¿Estás seguro de que deseas eliminar este proyecto?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsModalOpen(false)}
      />
      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          isOpen={isModalOpenDetail}
          onClose={() => setIsModalOpenDetail(false)}
        />
      )}
    </div>
  );
}
