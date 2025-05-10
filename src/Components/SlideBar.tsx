export default function SlideBar() {
  return (
    <>
      <aside className="sidebar">
        <div className="logo">
          <i className="fas fa-chart-line"></i>
          <h1>ISO 25010 QMS</h1>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="#" className="nav-link active">
              <i className="fas fa-home"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <i className="fas fa-cube"></i>
              <span>Modelo de Calidad</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <i className="fas fa-database"></i>
              <span>Recolección de Datos</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <i className="fas fa-cogs"></i>
              <span>Motor de Evaluación</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <i className="fas fa-chart-bar"></i>
              <span>Reportes</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <i className="fas fa-plug"></i>
              <span>Integración y APIs</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <i className="fas fa-shield-alt"></i>
              <span>Seguridad y Roles</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <i className="fas fa-sliders-h"></i>
              <span>Administración</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <i className="fas fa-project-diagram"></i>
              <span>Proyectos</span>
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
}
