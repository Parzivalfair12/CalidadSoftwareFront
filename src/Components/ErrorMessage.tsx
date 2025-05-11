import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

interface ErrorMessageProps {
  message: string; 
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="error-container">
      <FontAwesomeIcon icon={faExclamationTriangle} size="2x" className="error-icon" />
      <p className="error-text">{message}</p>
    </div>
  );
};

export default ErrorMessage;