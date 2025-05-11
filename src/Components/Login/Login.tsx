import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    remember: false,
  });
  
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      setError("Credenciales incorrectas");
      console.error("Error en login:", err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Iniciar Sesión</h2>
        
        {error && (
          <div className="login-error-message">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="login-input-group">
            <label htmlFor="login-email" className="login-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="login-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
              className="login-input"
            />
          </div>
          
          <div className="login-input-group">
            <label htmlFor="login-password" className="login-label">
              Contraseña
            </label>
            <input
              type="password"
              id="login-password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="login-input"
              minLength={6}
            />
          </div>
          
          <div className="login-remember">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="login-checkbox"
            />
            <label htmlFor="remember" className="login-remember-label">
              Recordarme
            </label>
          </div>
          
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
          
          <div className="login-footer">
            ¿No tienes una cuenta?{" "}
            <a href="#register-form" className="login-footer-link">
              Regístrate
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;