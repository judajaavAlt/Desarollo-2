import React from 'react';
import './ReadMovement.css';

const ReadMovement = ({ movement, onClose }) => {
  return (
    <div className="read-movement">
      <h2>Información del Movimiento</h2>
      <p><strong>Monto:</strong> ${movement.amount}</p>
      <p><strong>Fecha:</strong> {movement.date}</p>
      <p><strong>Billetera:</strong> {movement.wallet}</p>
      <p><strong>Descripción:</strong> {movement.description}</p>
      <div className="actions">
        <button onClick={onClose} className="close-btn">Cerrar</button>
      </div>
    </div>
  );
};

export default ReadMovement;
