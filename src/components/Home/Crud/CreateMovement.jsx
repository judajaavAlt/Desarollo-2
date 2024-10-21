import React from 'react';
import './CreateMovement.css'; 
 
const CreateMovement = ({ onClose }) => {
  return (
    <div>
      <h2>Crear Nuevo Movimiento</h2>
      {/* Contenido del formulario de creación */}
      <form>
        {/* Aquí irían los campos para crear un nuevo movimiento */}
        <input type="text" placeholder="Descripción" />
        <input type="number" placeholder="Cantidad" />
        <button type="submit">Crear</button>
      </form>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default CreateMovement;
