import React, { useState } from 'react';
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

  // Maneja la eliminación de una billetera
  const handleDelete = (deletedWallet) => {
    if (onWalletDeleted) {
      onWalletDeleted(deletedWallet); // Notifica al componente padre que la billetera fue eliminada
    }
    setIsModalOpen(false); // Cierra el modal de detalles después de eliminar
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
      {wallets.length === 0 && <p>No hay billeteras disponibles.</p>}

      {/* Lista de billeteras */}
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

      {/* Modal para mostrar detalles de la billetera */}
      {selectedWallet && (
        <ReadWalletModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)} // Cierra el modal de detalles
          wallet={selectedWallet} // Pasa la billetera seleccionada
          onDelete={handleDelete} // Maneja la eliminación
          onUpdate={onWalletUpdated} // Maneja la actualización
        />
      )}

      {/* Modal para crear una nueva billetera */}
      <CreateWalletModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal} // Cierra el modal de creación
        onWalletCreated={onWalletCreated} // Notifica al padre que se creó una billetera
      />
    </div>
  );
}

WalletList.propTypes = {
  wallets: PropTypes.array.isRequired, // Lista de billeteras
  onWalletCreated: PropTypes.func.isRequired, // Función para manejar la creación de una billetera
  onWalletDeleted: PropTypes.func.isRequired, // Función para manejar la eliminación de una billetera
  onWalletUpdated: PropTypes.func.isRequired, // Función para manejar la actualización de una billetera
};

export default WalletList;
