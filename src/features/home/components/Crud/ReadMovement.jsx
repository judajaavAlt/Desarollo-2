/*
import { useState } from 'react';
import './ReadMovement.css';
import UpdateMovement from './UpdateMovement';
import DeleteMovement from './DeleteMovement';

const ReadMovement = ({ movement, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const openEditModal = () => setIsEditing(true);
  const closeEditModal = () => setIsEditing(false);

  const openDeleteModal = () => setIsDeleting(true);
  const closeDeleteModal = () => setIsDeleting(false);

  const handleDelete = async () => {
    try {
      {//Aqui se conecta con el backend el delete} 
      const response = await fetch(`URL_DE_TU_BACKEND/api/movements/${movement.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Movimiento eliminado exitosamente.');
        onClose();
      } else {
        alert('Error al eliminar el movimiento.');
      }
    } catch (error) {
      console.error('Error al eliminar el movimiento:', error);
      alert('Hubo un problema al conectar con el servidor.');
    }
  };

  return (
    <div className="read-movement">
      {!isEditing && !isDeleting && (
        <>
          <h2>INFORMACIÓN DEL MOVIMIENTO:</h2>
          <div className="info-row">
            <div className="info-box">
              <p><strong>MONTO:</strong></p>
              <p className="info-value">{movement.amount}</p>
            </div>
            <div className="info-box">
              <p><strong>FECHA:</strong></p>
              <p className="info-value">{movement.date}</p>
            </div>
            <div className="info-box">
              <p><strong>BILLETERA:</strong></p>
              <p className="info-value">{movement.wallet}</p>
            </div>
          </div>
          <div className="description-box">
            <p><strong>DESCRIPCIÓN:</strong></p>
            <p>{movement.description}</p>
          </div>
          <div className="category-box">
            <p><strong>CATEGORÍA:</strong></p>
            <div className="category-circle">
              <p>{movement.category}</p>
            </div>
          </div>
          <div className="actions">
            <button onClick={openDeleteModal} className="delete-btn">BORRAR</button>
            <button onClick={openEditModal} className="edit-btn">EDITAR</button>
            <button onClick={onClose} className="exit-btn">VOLVER</button>
          </div>
        </>
      )}

      {isEditing && <UpdateMovement movement={movement} onClose={closeEditModal} />}
      {isDeleting && <DeleteMovement onClose={closeDeleteModal} onDelete={handleDelete} />}
    </div>
  );
};

export default ReadMovement;
*/