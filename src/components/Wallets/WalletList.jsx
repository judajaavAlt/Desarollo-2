import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaWallet, FaRegEye } from 'react-icons/fa';
import ReadWalletModal from './Crud/ReadWalletModal';
import CreateWalletModal from './Crud/CreateWalletModal';
import './WalletList.css';

function WalletList({ wallets, onWalletCreated, onWalletDeleted, onWalletUpdated }) {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Maneja la apertura del modal para mostrar detalles de la billetera
  const handleViewMore = (wallet) => {
    setSelectedWallet(wallet);
    setIsModalOpen(true);
  };

  // Maneja el cierre del modal de detalles
  const closeDetailModal = () => {
    setSelectedWallet(null);
    setIsModalOpen(false);
  };

  // Maneja la eliminación de una billetera
  const handleDelete = (deletedWallet) => {
    if (onWalletDeleted) {
      onWalletDeleted(deletedWallet); // Notifica al componente padre que la billetera fue eliminada
    }
    closeDetailModal(); // Cierra el modal de detalles después de eliminar
  };

  // Maneja la creación de una nueva billetera
  const handleCreate = (newWallet) => {
    if (onWalletCreated) {
      onWalletCreated(newWallet); // Notifica al componente padre que se creó una nueva billetera
    }
    closeCreateModal(); // Cierra el modal de creación después de añadir
  };

  // Maneja la apertura del modal de creación
  const openCreateModal = () => setIsCreateModalOpen(true);

  // Maneja el cierre del modal de creación
  const closeCreateModal = () => setIsCreateModalOpen(false);

  return (
    <div className="wallet-list">
      {/* Botón para abrir el modal de creación */}
      <button className="create-wallet-button" onClick={openCreateModal}>
        Crear Billetera
      </button>

      {/* Mensaje cuando no hay billeteras */}
      {wallets.length === 0 ? (
        <p>No hay billeteras disponibles.</p>
      ) : (
        <div className="wallets">
          {wallets.map((wallet) => (
            <div key={wallet.id} className="wallet-item">
              <div className="wallet-icon">
                <FaWallet />
              </div>
              <div className="wallet-details">
                <h3>{wallet.name}</h3>
                <p>
                  {wallet.amount} {wallet.currency}
                </p>
              </div>
              <button
                className="view-more-button"
                onClick={() => handleViewMore(wallet)}
              >
                <FaRegEye />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal para mostrar detalles de la billetera */}
      {selectedWallet && (
        <ReadWalletModal
          isOpen={isModalOpen}
          onClose={closeDetailModal} // Cierra el modal de detalles
          wallet={selectedWallet} // Pasa la billetera seleccionada
          onDelete={handleDelete} // Maneja la eliminación
          onUpdate={onWalletUpdated} // Maneja la actualización
        />
      )}

      {/* Modal para crear una nueva billetera */}
      {isCreateModalOpen && (
        <CreateWalletModal
          isOpen={isCreateModalOpen}
          onClose={closeCreateModal} // Cierra el modal de creación
          onWalletCreated={handleCreate} // Maneja la creación
        />
      )}
    </div>
  );
}

WalletList.propTypes = {
  wallets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
    })
  ).isRequired, // Lista de billeteras
  onWalletCreated: PropTypes.func.isRequired, // Función para manejar la creación de una billetera
  onWalletDeleted: PropTypes.func.isRequired, // Función para manejar la eliminación de una billetera
  onWalletUpdated: PropTypes.func.isRequired, // Función para manejar la actualización de una billetera
};

export default WalletList;
