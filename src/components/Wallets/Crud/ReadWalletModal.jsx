import  { useState } from 'react';
import PropTypes from 'prop-types'; // Importar PropTypes
import './ReadWalletModal.css'; // Asegúrate de tener estilos asociados
import UpdateWalletModal from './UpdateWalletModal'; // Importar el modal de edición

function ReadWalletModal({ isOpen, onClose, wallet, onDelete }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Controlar el estado del modal de edición

  if (!isOpen) return null;

  const handleEditClick = () => {
    setIsEditModalOpen(true); // Abrir el modal de edición cuando se hace clic en "Editar"
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false); // Cerrar el modal de edición
  };

  const handleSave = (updatedWallet) => {
    console.log('Guardar cambios de billetera:', updatedWallet);
    setIsEditModalOpen(false); // Cerrar el modal después de guardar
    onClose(); // Cerrar el modal de lectura también si es necesario
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2>Detalles de {wallet.name}</h2>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
          <div className="modal-body">
            <p><strong>Cantidad:</strong> {wallet.amount} {wallet.currency}</p>
            <p><strong>Nombre:</strong> {wallet.name}</p>
          </div>
          <div className="modal-footer">
            <button className="delete-button" onClick={() => onDelete(wallet)}>Eliminar</button>
            <button className="edit-button" onClick={handleEditClick}>Editar</button>
          </div>
        </div>
      </div>

      {/* Modal para editar la billetera */}
      {isEditModalOpen && (
        <UpdateWalletModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          wallet={wallet} // Pasar los datos de la billetera
          onSave={handleSave} // Guardar los cambios
        />
      )}
    </>
  );
}

// Definir PropTypes para validar las props
ReadWalletModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ReadWalletModal;
