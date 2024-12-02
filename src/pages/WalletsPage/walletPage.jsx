import { useState, useEffect } from 'react';
import Header from '../../components/Wallets/Header/Header';
import TransactionList from '../../components/Transactions/TransactionList';
import WalletList from '../../components/Wallets/WalletList';
import CreateWalletModal from '../../components/Wallets/Crud/CreateWalletModal';
import { readWallet } from '../../helpers/portWallets';
import './walletPage.css';

function WalletsPage() {
  const [wallets, setWallets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar billeteras desde el servidor
  const fetchWallets = async () => {
    try {
      const userID = 1; // Ajustar según tu lógica de autenticación
      const data = await readWallet(userID);
      const mappedWallets = data.map((wallet) => ({
        id: wallet.id,
        name: wallet.walletName,
        amount: wallet.walletAmount,
        currency: wallet.currency || 'COL$',
      }));
      setWallets(mappedWallets);
    } catch (error) {
      console.error('Error al cargar las billeteras:', error);
    }
  };

  useEffect(() => {
    fetchWallets(); // Cargar billeteras al montar el componente
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Función para actualizar billeteras tras crear una nueva
  const handleWalletCreated = () => {
    fetchWallets();
    closeModal();
  };

  // Función para actualizar billeteras tras eliminar una
  const handleWalletDeleted = () => {
    fetchWallets();
  };

  // Función para actualizar billeteras tras editar una
  const handleWalletUpdated = () => {
    fetchWallets();
  };

  return (
    <div className="wallet-page">
      <Header />

      {/* Botón para abrir el modal de creación de billetera */}
      <button className="create-wallet-btn" onClick={openModal}>
        Crear Billetera
      </button>

      {/* Contenedor principal para las listas */}
      <div className="main-content">
        <div className="wallet-list-container">
          <h2>Mis Billeteras</h2>
          <WalletList
            wallets={wallets}
            onWalletCreated={handleWalletCreated}
            onWalletDeleted={handleWalletDeleted} // Manejar eliminaciones
            onWalletUpdated={handleWalletUpdated} // Manejar actualizaciones
          />
        </div>

        <div className="transaction-list-container">
          <h2>Transferencias</h2>
          <TransactionList />
        </div>
      </div>

      {/* Modal para crear una billetera */}
      <CreateWalletModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onWalletCreated={handleWalletCreated}
      />
    </div>
  );
}

export default WalletsPage;
