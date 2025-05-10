import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faChartPie } from '@fortawesome/free-solid-svg-icons';

export default function GraphicDashBoard() {
  return (
    <div className="widget">
      <div className="widget-header">
        <h3 className="widget-title">Evaluación de Calidad - Proyecto Actual</h3>
        <div className="widget-actions">
          <button className="btn btn-primary">
            <FontAwesomeIcon icon={faDownload} /> Exportar
          </button>
        </div>
      </div>
      <div className="chart-container">
        <div className="chart-placeholder">
          <div style={{ textAlign: 'center' }}>
            <FontAwesomeIcon 
              icon={faChartPie} 
              style={{ 
                fontSize: '3rem', 
                marginBottom: '1rem' 
              }} 
            />
            <p>Gráfico de Radar - Características ISO 25010</p>
            <p style={{ 
                fontSize: '0.875rem', 
                marginTop: '0.5rem' 
              }}
            >
              Muestra puntuaciones en: Funcionalidad, Fiabilidad, Usabilidad,
              Eficiencia, Mantenibilidad, Portabilidad, Seguridad,
              Compatibilidad
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}