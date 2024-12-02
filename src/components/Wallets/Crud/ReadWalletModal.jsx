import { useState } from 'react';
import PropTypes from 'prop-types';
import './ReadWalletModal.css';
import UpdateWalletModal from './UpdateWalletModal.jsx';

import { readWallet, deleteWallet, updateWallet } from '../../../helpers/portWallets.js'; // Importar las funciones necesarias

function ReadWalletModal({ isOpen, onClose, wallet, onDelete, onUpdate }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Validar que el modal solo se renderice si está abierto
  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      // Si el `wallet.id` no está disponible, intenta obtenerlo desde la base de datos
      let walletID = wallet?.id;

      if (!walletID) {
        console.warn('El ID de la billetera no está definido. Intentando obtenerlo...');
        const userID = 1; // Ajustar según la lógica de autenticación

        // Obtener la lista de billeteras para encontrar el walletID
        const wallets = await readWallet(userID);
        const matchingWallet = wallets.find((w) => w.walletName === wallet.name);

        if (!matchingWallet) {
          console.error('No se pudo encontrar una billetera que coincida:', wallet.name);
          setErrorMessage('No se pudo eliminar la billetera. Verifica el nombre.');
          return;
        }

        walletID = matchingWallet.walletID; // Asigna el ID encontrado
      }

      // Llama a la función deleteWallet con el ID de la billetera
      await deleteWallet(walletID);

      // Mostrar mensaje de éxito
      setSuccessMessage('¡La billetera fue eliminada exitosamente!');
      setTimeout(() => {
        setSuccessMessage('');
        if (onDelete) {
          onDelete(wallet); // Notifica al componente padre que la billetera fue eliminada
        }
        onClose(); // Cierra el modal
      }, 2000);
    } catch (error) {
      console.error('Error al eliminar la billetera:', error);
      setErrorMessage('No se pudo eliminar la billetera. Intenta nuevamente.');
    }
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSave = async (updatedWallet) => {
    try {
      await updateWallet(
        updatedWallet.id,
        updatedWallet.name,
        updatedWallet.amount,
        updatedWallet.icon,
        1 // userID, ajustar según lógica
      );

      setSuccessMessage('¡La billetera fue actualizada exitosamente!');
      setTimeout(() => {
        setSuccessMessage('');
        if (onUpdate) {
          onUpdate(updatedWallet); // Notifica al componente padre que la billetera fue actualizada
        }
        setIsEditModalOpen(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error al actualizar la billetera:', error);
      setErrorMessage('No se pudo actualizar la billetera. Intenta nuevamente.');
    }
  };

  return (
    <>
      {/* Modal principal */}
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
          onSave={handleSave} // Maneja la lógica de guardar cambios
        />
      )}

      {/* Mensaje de Éxito */}
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      {/* Mensaje de Error */}
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
    </>
  );
}

// Validación de PropTypes
ReadWalletModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    id: PropTypes.number,
    amount: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.node,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired, // Nueva función para manejar la actualización
};

export default ReadWalletModal;
