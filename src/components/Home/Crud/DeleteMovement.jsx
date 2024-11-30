import React from 'react';
import './DeleteMovement.css';

const DeleteMovement = ({ onClose, onDelete }) => {
  return (
    <div className="delete-movement">
      <h2>¿Quieres eliminar este movimiento?</h2>
      <div className="actions">
        <button className="delete-btn" onClick={onDelete}>Sí</button>
        <button className="cancel-btn" onClick={onClose}>No</button>
      </div>
    </div>
  );
};

export default DeleteMovement;
