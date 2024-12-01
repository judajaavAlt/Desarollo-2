import { useState } from 'react';
import PropTypes from 'prop-types';
import './ReadWalletModal.css';
import UpdateWalletModal from './UpdateWalletModal';

function ReadWalletModal({ isOpen, onClose, wallet, onDelete }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  if (!isOpen) return null;

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSave = (updatedWallet) => {
    console.log('Guardar cambios de billetera:', updatedWallet);
    setIsEditModalOpen(false);
    onClose();
  };

  const handleDelete = () => {
    setShowConfirmationDialog(false); // Cierra el diálogo de confirmación
    onDelete(wallet); // Llama a la función de eliminación
    setShowSuccessMessage(true); // Muestra el mensaje de éxito
    setTimeout(() => {
      setShowSuccessMessage(false); // Oculta el mensaje después de 3 segundos
      onClose(); // Cierra el modal principal
    }, 3000);
  };

  return (
    <>
      <div className="read-wallet-modal-overlay">
        <div className="read-wallet-modal">
          <div className="read-wallet-modal-header">
            <h2>Detalles de {wallet.name}</h2>
            <button className="read-wallet-close-button" onClick={onClose}>
              ×
            </button>
          </div>
          <div className="read-wallet-modal-body">
            <p>
              <strong>Cantidad:</strong> {wallet.amount} {wallet.currency}
            </p>
            <p>
              <strong>Nombre:</strong> {wallet.name}
            </p>
          </div>
          <div className="read-wallet-modal-footer">
            <button
              className="read-wallet-delete-button"
              onClick={() => setShowConfirmationDialog(true)}
            >
              Eliminar
            </button>
            <button
              className="read-wallet-edit-button"
              onClick={handleEditClick}
            >
              Editar
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Confirmación */}
      {showConfirmationDialog && (
        <div className="confirmation-dialog-overlay">
          <div className="confirmation-dialog">
            <p>¿Estás seguro de que deseas eliminar esta billetera?</p>
            <div className="confirmation-dialog-buttons">
              <button
                className="confirmation-dialog-cancel"
                onClick={() => setShowConfirmationDialog(false)}
              >
                Cancelar
              </button>
              <button
                className="confirmation-dialog-confirm"
                onClick={handleDelete}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edición */}
      {isEditModalOpen && (
        <UpdateWalletModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          wallet={wallet}
          onSave={handleSave}
        />
      )}

      {/* Mensaje de Éxito */}
      {showSuccessMessage && (
        <div className="success-message">
          ¡La billetera fue eliminada exitosamente!
        </div>
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
