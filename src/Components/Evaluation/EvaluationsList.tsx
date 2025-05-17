import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2, Plus, Check, X } from "lucide-react";
import { getEvaluations, deleteEvaluation } from "../../Api/EvaluationsApi";
import { type Evaluation } from "../../Types/Index";

export default function EvaluationsList() {
  const navigate = useNavigate();
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [evaluationToDelete, setEvaluationToDelete] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const data = await getEvaluations();
        setEvaluations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      }
    };

    fetchEvaluations();
  }, []);

  const handleDeleteClick = (evaluationId: string) => {
    setEvaluationToDelete(evaluationId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!evaluationToDelete) return;

    try {
      setIsDeleting(evaluationToDelete);
      await deleteEvaluation(evaluationToDelete);
      setEvaluations((prev) =>
        prev.filter((evaluation) => evaluation._id !== evaluationToDelete)
      );
      setShowDeleteModal(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al eliminar evaluación"
      );
    } finally {
      setIsDeleting(null);
      setEvaluationToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setEvaluationToDelete(null);
  };

  const getProjectName = (projectId: string | { name: string }): string => {
    return typeof projectId === "string" ? projectId : projectId.name;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="retry-button"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="evaluations-container">
        {/* Modal de confirmación */}
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal-container">
              <div className="modal-header">
                <h3>Confirmar Eliminación</h3>
                <button onClick={cancelDelete} className="modal-close-btn">
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que deseas eliminar esta evaluación?</p>
                <p className="text-muted">Esta acción no se puede deshacer.</p>
              </div>
              <div className="modal-footer">
                <button onClick={cancelDelete} className="btn btn-secondary">
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="btn btn-danger"
                  disabled={isDeleting !== null}
                >
                  {isDeleting ? (
                    <span className="spinner"></span>
                  ) : (
                    <>
                      <Check size={18} /> Confirmar
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="evaluations-header">
          <h1>Listado de Evaluaciones</h1>
          <button
            onClick={() => navigate("/evaluation/create")}
            className="new-evaluation-button"
          >
            <Plus size={18} />
            <span>Nueva Evaluación</span>
          </button>
        </div>

        <div className="evaluations-table-container">
          <table className="evaluations-table">
            <thead>
              <tr>
                <th>Proyecto</th>
                <th>Fecha</th>
                <th>Resultado</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {evaluations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="no-evaluations">
                    No hay evaluaciones registradas
                  </td>
                </tr>
              ) : (
                evaluations.map((evaluation) => (
                  <tr key={evaluation._id}>
                    <td>{getProjectName(evaluation.projectId)}</td>
                    <td>{formatDate(evaluation.date)}</td>
                    <td>
                      {evaluation.result
                        ? `${evaluation.result.toFixed(2)}%`
                        : "N/A"}
                    </td>
                    <td>
                      <span
                        className={`status-badge status-${evaluation.status.toLowerCase()}`}
                      >
                        {evaluation.status}
                      </span>
                    </td>
                    <td>
                      <div className="actions-container">
                        <button
                          onClick={() =>
                            navigate(`/evaluations/edit/${evaluation._id}`)
                          }
                          title="Editar"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() =>
                            evaluation._id && handleDeleteClick(evaluation._id)
                          }
                          title="Eliminar"
                          disabled={isDeleting === evaluation._id}
                        >
                          {isDeleting === evaluation._id ? (
                            "Eliminando..."
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
