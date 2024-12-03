import { useState } from 'react';
import PropTypes from 'prop-types';
import './ReadWalletModal.css';
import UpdateWalletModal from './UpdateWalletModal.jsx';
import ConfirmationDialog from './ConfirmationDialog.jsx';
import { readWallet, deleteWallet, updateWallet } from '../../../helpers/portWallets.js';

// Función para obtener el ID de la billetera
const fetchWalletID = async (id, name) => {
  if (id) return id;
  const userID = 1; // Ajustar según la lógica de autenticación
  const wallets = await readWallet(userID);
  const matchingWallet = wallets.find((w) => w.walletName === name);
  if (!matchingWallet) throw new Error('No se encontró la billetera.');
  return matchingWallet.walletID;
};

const ReadWalletModal = ({ isOpen, onClose, wallet, onDelete, onUpdate }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      const walletID = await fetchWalletID(wallet?.id, wallet.name);
      await deleteWallet(walletID);
      setSuccessMessage('¡La billetera fue eliminada exitosamente!');
      if (onDelete) onDelete(wallet);
      onClose();
    } catch {
      setErrorMessage('No se pudo eliminar la billetera. Intenta nuevamente.');
    }
  };

  const handleSave = async (updatedWallet) => {
    try {
      await updateWallet(updatedWallet.id, updatedWallet.name, updatedWallet.amount, updatedWallet.icon, 1);
      setSuccessMessage('¡La billetera fue actualizada exitosamente!');
      if (onUpdate) onUpdate(updatedWallet);
      setIsEditModalOpen(false);
      onClose();
    } catch {
      setErrorMessage('No se pudo actualizar la billetera. Intenta nuevamente.');
    }
  };

  return (
    <>
      <ModalContent
        wallet={wallet}
        onClose={onClose}
        onEdit={() => setIsEditModalOpen(true)}
        onDelete={() => setShowConfirmationDialog(true)}
      />

      {showConfirmationDialog && (
        <ConfirmationDialog
          message="¿Estás seguro de que deseas eliminar esta billetera?"
          onCancel={() => setShowConfirmationDialog(false)}
          onConfirm={handleDelete}
        />
      )}

      {isEditModalOpen && (
        <UpdateWalletModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          wallet={wallet}
          onSave={handleSave}
        />
      )}

      <AlertMessage type="success" message={successMessage} />
      <AlertMessage type="error" message={errorMessage} />
    </>
  );
};

const ModalContent = ({ wallet, onClose, onEdit, onDelete }) => (
  <div className="read-wallet-modal-overlay">
    <div className="read-wallet-modal">
      <ModalHeader title={`Detalles de ${wallet.name}`} onClose={onClose} />
      <ModalBody wallet={wallet} />
      <ModalFooter onEdit={onEdit} onDelete={onDelete} />
    </div>
  </div>
);

const ModalHeader = ({ title, onClose }) => (
  <div className="read-wallet-modal-header">
    <h2>{title}</h2>
    <button className="read-wallet-close-button" onClick={onClose}>
      ×
    </button>
  </div>
);

const ModalBody = ({ wallet }) => (
  <div className="read-wallet-modal-body">
    <p>
      <strong>Cantidad:</strong> {wallet.amount} {wallet.currency}
    </p>
    <p>
      <strong>Nombre:</strong> {wallet.name}
    </p>
  </div>
);

const ModalFooter = ({ onEdit, onDelete }) => (
  <div className="read-wallet-modal-footer">
    <button className="read-wallet-delete-button" onClick={onDelete}>
      Eliminar
    </button>
    <button className="read-wallet-edit-button" onClick={onEdit}>
      Editar
    </button>
  </div>
);

const AlertMessage = ({ type, message }) => {
  if (!message) return null;
  return <div className={`${type}-message`}>{message}</div>;
};

// PropTypes
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
  onUpdate: PropTypes.func.isRequired,
};

ModalContent.propTypes = {
  wallet: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalBody.propTypes = {
  wallet: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

ModalFooter.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

AlertMessage.propTypes = {
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  message: PropTypes.string,
};

export default ReadWalletModal;
