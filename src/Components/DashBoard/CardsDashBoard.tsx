import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCube,
  faDatabase,
  faCogs,
  faChartBar,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

export default function CardsDashBoard() {
  return (
    <div className="card-grid">
      {/* Tarjeta 1 - Modelo de Calidad */}
      <div className="card">
        <div className="card-header">
          <div
            className="card-icon"
            style={{
              backgroundColor: "rgba(37, 99, 235, 0.1)",
              color: "var(--primary)",
            }}
          >
            <FontAwesomeIcon icon={faCube} />
          </div>
          <h3 className="card-title">Modelo de Calidad</h3>
        </div>
        <div className="card-content">
          <p>
            Gestione características y subcaracterísticas según ISO 25010:
            Funcionalidad, Fiabilidad, Usabilidad, etc.
          </p>
        </div>
        <div className="card-footer">
          <a href="#" className="btn btn-primary">
            <FontAwesomeIcon icon={faArrowRight} /> Acceder
          </a>
        </div>
      </div>

      {/* Tarjeta 2 - Recolección de Datos */}
      <div className="card">
        <div className="card-header">
          <div
            className="card-icon"
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              color: "var(--success)",
            }}
          >
            <FontAwesomeIcon icon={faDatabase} />
          </div>
          <h3 className="card-title">Recolección de Datos</h3>
        </div>
        <div className="card-content">
          <p>
            Integre herramientas externas como SonarQube, JMeter y recopile
            feedback de usuarios.
          </p>
        </div>
        <div className="card-footer">
          <a href="#" className="btn btn-primary">
            <FontAwesomeIcon icon={faArrowRight} /> Acceder
          </a>
        </div>
      </div>

      {/* Tarjeta 3 - Motor de Evaluación */}
      <div className="card">
        <div className="card-header">
          <div
            className="card-icon"
            style={{
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              color: "var(--warning)",
            }}
          >
            <FontAwesomeIcon icon={faCogs} />
          </div>
          <h3 className="card-title">Motor de Evaluación</h3>
        </div>
        <div className="card-content">
          <p>
            Configure pesos, normalice métricas y calcule puntuaciones de
            calidad del software.
          </p>
        </div>
        <div className="card-footer">
          <a href="#" className="btn btn-primary">
            <FontAwesomeIcon icon={faArrowRight} /> Acceder
          </a>
        </div>
      </div>

      {/* Tarjeta 4 - Reportes y Visualización */}
      <div className="card">
        <div className="card-header">
          <div
            className="card-icon"
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              color: "var(--danger)",
            }}
          >
            <FontAwesomeIcon icon={faChartBar} />
          </div>
          <h3 className="card-title">Reportes y Visualización</h3>
        </div>
        <div className="card-content">
          <p>
            Genere informes y dashboards interactivos con gráficos de radar,
            heatmaps y series temporales.
          </p>
        </div>
        <div className="card-footer">
          <a href="#" className="btn btn-primary">
            <FontAwesomeIcon icon={faArrowRight} /> Acceder
          </a>
        </div>
      </div>
    </div>
  );
}