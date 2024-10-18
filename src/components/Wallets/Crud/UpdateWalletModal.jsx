import { useState } from 'react';
import PropTypes from 'prop-types'; // Importar PropTypes
import {
  FaWallet,
  FaMoneyBillWave,
  FaPiggyBank,
  FaUniversity,
  FaMobileAlt,
  FaCreditCard,
  FaMoneyCheckAlt,
} from 'react-icons/fa'; // Íconos
import './UpdateWalletModal.css'; // Asegúrate de tener estilos asociados

function EditWalletModal({ isOpen, onClose, wallet, onSave }) {
  // Definimos el estado inicial basado en los valores actuales de la billetera
  const [amount, setAmount] = useState(wallet.amount);
  const [name, setName] = useState(wallet.name);
  const [currency, setCurrency] = useState(wallet.currency);
  const [icon, setIcon] = useState(wallet.icon); // Estado para el ícono actual

  const icons = [
    { id: 1, icon: <FaWallet /> },
    { id: 2, icon: <FaMoneyBillWave /> },
    { id: 3, icon: <FaPiggyBank /> },
    { id: 4, icon: <FaUniversity /> },
    { id: 5, icon: <FaMobileAlt /> },
    { id: 6, icon: <FaCreditCard /> },
    { id: 7, icon: <FaMoneyCheckAlt /> }
  ];

  if (!isOpen) return null;

  const handleSave = () => {
    const updatedWallet = { ...wallet, amount, name, currency, icon };
    onSave(updatedWallet); // Guardar los cambios
    onClose(); // Cerrar el modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Editar {wallet.name}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Cantidad</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Nombre de la billetera</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Moneda</label>
            <input
              type="text"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Ícono</label>
            <div className="icon-selection">
              {icons.map((iconItem) => (
                <button
                  key={iconItem.id}
                  className={`icon-button ${icon === iconItem.icon ? 'selected' : ''}`}
                  onClick={() => setIcon(iconItem.icon)}
                >
                  {iconItem.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="save-button" onClick={handleSave}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

// Definir PropTypes para validar las props
EditWalletModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.node, // Asegurarse de que el ícono sea un nodo de React
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditWalletModal;
