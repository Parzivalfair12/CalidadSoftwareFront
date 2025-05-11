import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function LoadingMessage() {
  return (
    <div className="loading-container">
      <FontAwesomeIcon icon={faSpinner} spin size="2x" className="loading-icon" />
      <p className="loading-text">Cargando...</p>
    </div>
  );
}