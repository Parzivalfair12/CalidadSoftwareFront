import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faPlusCircle, faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function MetricsTable() {
  return (
    <div className="widget">
      <div className="widget-header">
        <h3 className="widget-title">Métricas de Calidad</h3>
        <div className="widget-actions">
          <button className="btn btn-primary">
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
            <tr>
              <td>Funcionalidad</td>
              <td>Completitud</td>
              <td>Cobertura de requisitos</td>
              <td className="actions-cell">
                <button className="btn-icon" title="Editar">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="btn-icon" title="Eliminar">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button className="btn-icon" title="Detalles">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </td>
            </tr>
            <tr>
              <td>Eficiencia</td>
              <td>Comportamiento temporal</td>
              <td>Tiempo de respuesta</td>
              <td className="actions-cell">
                <button className="btn-icon" title="Editar">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="btn-icon" title="Eliminar">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button className="btn-icon" title="Detalles">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </td>
            </tr>
            <tr>
              <td>Seguridad</td>
              <td>Confidencialidad</td>
              <td>Vulnerabilidades detectadas</td>
              <td className="actions-cell">
                <button className="btn-icon" title="Editar">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="btn-icon" title="Eliminar">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button className="btn-icon" title="Detalles">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </td>
            </tr>
            <tr>
              <td>Mantenibilidad</td>
              <td>Modularidad</td>
              <td>Acoplamiento</td>
              <td className="actions-cell">
                <button className="btn-icon" title="Editar">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="btn-icon" title="Eliminar">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button className="btn-icon" title="Detalles">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}