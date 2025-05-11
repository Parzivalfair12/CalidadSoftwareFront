import React from "react";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};
