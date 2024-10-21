import React, { useState } from 'react';
import CreateMovement from '../../components/Home/Crud/CreateMovement'; // Modal de creación de movimiento
import ReadMovement from '../../components/Home/Crud/ReadMovement';    // Modal de lectura de movimiento
import './HomeMovementsList.css';
const HomeMovementsList = () => {
  const [showCreateModal, setShowCreateModal] = useState(false); // Controla el modal de creación
  const [showReadModal, setShowReadModal] = useState(false);     // Controla el modal de lectura
  const [selectedMovement, setSelectedMovement] = useState(null); // Almacena el movimiento seleccionado

  // Muestra el modal de creación
  const handleCreateMovement = () => {
    setShowCreateModal(true);
  };

  // Cierra el modal de creación
  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  // Muestra el modal de lectura con los datos del movimiento seleccionado
  const handleMovementClick = (movement) => {
    setSelectedMovement(movement);
    setShowReadModal(true);
  };

  // Cierra el modal de lectura
  const closeReadModal = () => {
    setShowReadModal(false);
    setSelectedMovement(null);
  };

  // Ejemplo de datos de movimientos recientes
  const movements = [
    { id: 1, description: 'Almuerzo', amount: 50.0, date: '20 de Septiembre' },
    { id: 2, description: 'Transporte', amount: 30.0, date: '21 de Septiembre' },
    { id: 3, description: 'Comida', amount: 20.0, date: '22 de Septiembre' },
  ];

  return (
    <div className="movements-list-container">
      <h2>Movimientos Recientes</h2>
      <ul>
        {movements.map((movement) => (
          <li key={movement.id} onClick={() => handleMovementClick(movement)}>
            {movement.description} ${movement.amount} - {movement.date}
          </li>
        ))}
      </ul>

      {/* Botón para crear nuevo movimiento */}
      <button className="create-movement-button" onClick={handleCreateMovement}>
        +
      </button>

      {/* Modal para crear movimiento */}
      {showCreateModal && (
        <div className="modal">
          <div className="modal-content">
            <CreateMovement onClose={closeCreateModal} /> {/* Pasa la función de cerrar */}
          </div>
        </div>
      )}

      {/* Modal para leer detalles de un movimiento */}
      {showReadModal && selectedMovement && (
        <div className="modal">
          <div className="modal-content">
            <ReadMovement movement={selectedMovement} onClose={closeReadModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeMovementsList;
