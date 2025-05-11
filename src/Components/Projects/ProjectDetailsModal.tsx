import { Modal } from "../Modal";
import type { Project } from "../../Types/Index";

interface ProjectDetailsModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ 
  project, 
  isOpen, 
  onClose 
}) => {
  if (!isOpen) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "No especificada";
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  return (
    <Modal onClose={onClose}>
      <div className="project-details">
        <h2 className="text-xl font-bold mb-4">Detalles del Proyecto</h2>
        
        <div className="detail-row mb-3">
          <span className="detail-label font-semibold">Nombre:</span>
          <span className="detail-value">{project.name}</span>
        </div>
        
        <div className="detail-row mb-3">
          <span className="detail-label font-semibold">Descripción:</span>
          <span className="detail-value">{project.description}</span>
        </div>
        
        <div className="detail-row mb-3">
          <span className="detail-label font-semibold">Estado:</span>
          <span className={`status ${project.status.toLowerCase().replace(' ', '-')} px-2 py-1 rounded`}>
            {project.status}
          </span>
        </div>
        
        <div className="detail-row mb-3">
          <span className="detail-label font-semibold">Fecha de Inicio:</span>
          <span className="detail-value">{formatDate(project.startDate)}</span>
        </div>
        
        <div className="detail-row mb-3">
          <span className="detail-label font-semibold">Fecha de Fin:</span>
          <span className="detail-value">{formatDate(project.endDate)}</span>
        </div>
        
        <div className="modal-actions mt-6">
          <button 
            className="btn btn-primary px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
};