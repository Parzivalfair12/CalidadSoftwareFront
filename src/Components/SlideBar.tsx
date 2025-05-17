import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCube,
  faDatabase,
  faCogs,
  faChartBar,
  faPlug,
  faShieldAlt,
  faSlidersH,
  faProjectDiagram,
  faEarth
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function SlideBar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h1>ISO 25010 QMS</h1>
      </div>
      <ul className="nav-menu">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            <FontAwesomeIcon icon={faHome} />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/metrics" className="nav-link">
            <FontAwesomeIcon icon={faCube} />
            <span>Metricas de calidad</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/projects" className="nav-link">
            <FontAwesomeIcon icon={faProjectDiagram} />
            <span>Proyectos</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/evaluation" className="nav-link">
            <FontAwesomeIcon icon={faEarth} />
            <span>Dashboard evaluación</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/evaluation/chart" className="nav-link">
            <FontAwesomeIcon icon={faChartBar} />
            <span>Reportes</span>
          </Link>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <FontAwesomeIcon icon={faShieldAlt} />
            <span>Seguridad y Roles</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <FontAwesomeIcon icon={faDatabase} />
            <span>Recolección de Datos</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <FontAwesomeIcon icon={faCogs} />
            <span>Motor de Evaluación</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <FontAwesomeIcon icon={faPlug} />
            <span>Integración y APIs</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <FontAwesomeIcon icon={faSlidersH} />
            <span>Administración</span>
          </a>
        </li>
      </ul>
    </aside>
  );
}
