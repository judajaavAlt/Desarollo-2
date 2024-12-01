import { useState } from 'react';
import Header from '../components/Header/Header';
import TransactionList from '../../transactions/components/TransactionList';
import WalletList from '../components/WalletList';
import CreateWalletModal from '../components/Crud/CreateWalletModal';
import '../styles/walletPage.css'; // Asegúrate de que el archivo CSS esté correctamente importado

function WalletsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="wallet-page">
      <Header />

      {/* Botón para abrir el modal de creación de billetera */}
      <button className="create-wallet-btn" onClick={openModal}>Crear Billetera</button>

     

      {/* Contenedor principal para las listas */}
      <div className="main-content">
        <div className="wallet-list-container">
          <h2>Mis Billeteras</h2>
          <WalletList />
        </div>

        <div className="transaction-list-container">
          <h2>Transferencias</h2>
          <TransactionList />
        </div>
      </div>

      {/* Modal para crear una billetera */}
      <CreateWalletModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default WalletsPage;
