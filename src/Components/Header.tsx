import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <div className="header">
      <h2>Dashboard de Evaluación de Calidad</h2>
      <div className="user-profile">
        <div className="user-icon-container">
          <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
        </div>
        <div className="profile-info">
          <span className="username">
            {user || "Usuario"}
          </span>
          <button onClick={logout} className="logout-button">
            <FontAwesomeIcon icon="sign-out-alt" className="logout-icon" />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};