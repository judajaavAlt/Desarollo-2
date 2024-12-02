import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  FaWallet,
  FaMoneyBillWave,
  FaPiggyBank,
  FaUniversity,
  FaMobileAlt,
  FaCreditCard,
  FaMoneyCheckAlt,
} from 'react-icons/fa';
import './UpdateWalletModal.css';

function UpdateWalletModal({ isOpen, onClose, wallet, onSave }) {
  const [amount, setAmount] = useState(wallet.amount);
  const [name, setName] = useState(wallet.name);
  const [currency, setCurrency] = useState(wallet.currency);
  const [icon, setIcon] = useState(wallet.icon);

  const icons = [
    { id: 1, icon: <FaWallet /> },
    { id: 2, icon: <FaMoneyBillWave /> },
    { id: 3, icon: <FaPiggyBank /> },
    { id: 4, icon: <FaUniversity /> },
    { id: 5, icon: <FaMobileAlt /> },
    { id: 6, icon: <FaCreditCard /> },
    { id: 7, icon: <FaMoneyCheckAlt /> },
  ];

  if (!isOpen) return null;

  const handleSave = () => {
    const updatedWallet = { ...wallet, amount, name, currency, icon };
    onSave(updatedWallet);
    onClose();
  };

  return (
    <div className="update-wallet-modal-overlay">
      <div className="update-wallet-modal">
        <div className="update-wallet-modal-header">
          <h2>Editar {wallet.name}</h2>
          <button className="update-wallet-close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="update-wallet-modal-body">
          <div className="update-wallet-form-group">
            <label>Cantidad</label>
            <input
              type="text"
              className="update-wallet-cantidad-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="update-wallet-form-group">
            <label>Nombre de la billetera</label>
            <input
              type="text"
              className="update-wallet-nombre-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Introduzca un nombre de billetera"
            />
          </div>
          <div className="update-wallet-form-group">
            <label>Moneda</label>
            <input
              type="text"
              className="update-wallet-currency-input"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              placeholder="COL$"
            />
          </div>
          <div className="update-wallet-form-group">
            <label>Ícono</label>
            <div className="update-wallet-icons-grid">
              {icons.map((iconItem) => (
                <button
                  key={iconItem.id}
                  className={`update-wallet-icon ${
                    icon === iconItem.icon ? 'selected' : ''
                  }`}
                  onClick={() => setIcon(iconItem.icon)}
                >
                  {iconItem.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="update-wallet-modal-footer">
          <button className="update-wallet-save-button" onClick={handleSave}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

UpdateWalletModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.node,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default UpdateWalletModal;
