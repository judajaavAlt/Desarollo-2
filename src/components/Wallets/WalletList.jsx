import  { useState } from 'react';
import { FaWallet, FaMoneyBillWave, FaPiggyBank, FaUniversity, FaMobileAlt, FaCreditCard, FaMoneyCheckAlt, FaRegEye } from 'react-icons/fa'; // Importar íconos de Font Awesome
import ReadWalletModal from './Crud/ReadWalletModal';
import './WalletList.css'; // Asegúrate de tener estilos asociados

const wallets = [
  { name: 'Principal', amount: '1.000.000', currency: 'COL$', icon: <FaWallet /> },
  { name: 'Efectivo', amount: '1.000.000', currency: 'COL$', icon: <FaMoneyBillWave /> },
  { name: 'Ahorro', amount: '500.000', currency: 'COL$', icon: <FaPiggyBank /> },
  { name: 'Banco', amount: '100.000', currency: 'COL$', icon: <FaUniversity /> },
  { name: 'Nequi', amount: '0', currency: 'COL$', icon: <FaMobileAlt /> },
  { name: 'Tarjeta débito', amount: '220.000', currency: 'COL$', icon: <FaCreditCard /> },
  { name: 'Daviplata', amount: '1.000.000', currency: 'COL$', icon: <FaMoneyCheckAlt /> },
];

function WalletList() {
  const [selectedWallet, setSelectedWallet] = useState(null); // Estado para la billetera seleccionada
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/cerrar el modal

  const handleViewMore = (wallet) => {
    setSelectedWallet(wallet); // Establecer la billetera seleccionada
    setIsModalOpen(true); // Abrir el modal
  };

  const handleDelete = (wallet) => {
    console.log('Eliminar billetera:', wallet);
    setIsModalOpen(false); // Cerrar el modal después de eliminar
  };

  const handleEdit = (wallet) => {
    console.log('Editar billetera:', wallet);
    setIsModalOpen(false); // Cerrar el modal después de editar
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="wallet-list">
      <div className="wallets">
        {wallets.map((wallet, index) => (
          <div key={index} className="wallet-item">
            <div className="wallet-icon">{wallet.icon}</div>
            <div className="wallet-details">
              <h3>{wallet.name}</h3>
              <p>{wallet.amount} {wallet.currency}</p>
            </div>
            {/* Ícono de ver más */}
            <button className="view-more-button" onClick={() => handleViewMore(wallet)}>
              <FaRegEye /> {/* Ícono de "ver más" */}
            </button>
          </div>
        ))}
      </div>

      {/* Modal para mostrar detalles de la billetera */}
      {selectedWallet && (
        <ReadWalletModal
          isOpen={isModalOpen}
          onClose={closeModal}
          wallet={selectedWallet}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}

export default WalletList;
