import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEye,
  faEdit,
  faDownload
} from "@fortawesome/free-solid-svg-icons";

export default function ProjectsTable() {
  return (
    <div className="widget">
      <div className="widget-header">
        <h3 className="widget-title">Evaluaciones Proyectos</h3>
        <div className="widget-actions">
          <button className="btn btn-primary">
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
              <th>Puntuación Global</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sistema de Gestión Financiera</td>
              <td>15/03/2023</td>
              <td>87/100</td>
              <td>
                <span className="status status-success">Aprobado</span>
              </td>
              <td className="actions-cell">
                <button className="icon-btn" title="Ver detalles">
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button className="icon-btn" title="Editar">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="icon-btn" title="Descargar reporte">
                  <FontAwesomeIcon icon={faDownload} />
                </button>
              </td>
            </tr>
            <tr>
              <td>Aplicación Móvil de Ventas</td>
              <td>02/04/2023</td>
              <td>72/100</td>
              <td>
                <span className="status status-warning">Revisión</span>
              </td>
              <td className="actions-cell">
                <button className="icon-btn" title="Ver detalles">
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button className="icon-btn" title="Editar">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="icon-btn" title="Descargar reporte">
                  <FontAwesomeIcon icon={faDownload} />
                </button>
              </td>
            </tr>
            <tr>
              <td>Portal Web Corporativo</td>
              <td>10/04/2023</td>
              <td>65/100</td>
              <td>
                <span className="status status-danger">No Aprobado</span>
              </td>
              <td className="actions-cell">
                <button className="icon-btn" title="Ver detalles">
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button className="icon-btn" title="Editar">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="icon-btn" title="Descargar reporte">
                  <FontAwesomeIcon icon={faDownload} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}