import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CreateWalletModal.css';
import { createWallet } from '../../../helpers/portWallets';
import {
  FaWallet,
  FaPiggyBank,
  FaUniversity,
  FaCreditCard,
  FaMobileAlt,
  FaCoins,
  FaMoneyBillWave,
  FaDollarSign,
  FaChartLine,
  FaHandHoldingUsd,
  FaMoneyCheckAlt,
  FaShoppingCart,
} from 'react-icons/fa';

function CreateWalletModal({ isOpen, onClose, onWalletCreated }) {
  const [walletAmount, setWalletAmount] = useState('');
  const [walletName, setWalletName] = useState('');
  const [walletIcon, setWalletIcon] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Maneja la creación de la billetera
  const handleCreateWallet = async () => {
    try {
      if (!walletName.trim() || !walletIcon || parseFloat(walletAmount) <= 0) {
        setErrorMessage('Completa todos los campos correctamente.');
        return;
      }

      const userID = 1; // Aquí se debería ajustar según la lógica de autenticación

      await createWallet(walletName.trim(), parseFloat(walletAmount), walletIcon, userID);

      // Limpiar los campos del formulario
      setWalletAmount('');
      setWalletName('');
      setWalletIcon('');
      setErrorMessage('');
      onWalletCreated(); // Notifica al componente padre que se creó una billetera
      onClose(); // Cierra el modal
    } catch (error) {
      console.error('Error al crear la billetera:', error);
      setErrorMessage('Error al crear la billetera. Intenta nuevamente.');
    }
  };

  if (!isOpen) return null; // No renderiza el modal si no está abierto

  const icons = [
    { id: 'FaWallet', component: FaWallet },
    { id: 'FaPiggyBank', component: FaPiggyBank },
    { id: 'FaUniversity', component: FaUniversity },
    { id: 'FaCreditCard', component: FaCreditCard },
    { id: 'FaMobileAlt', component: FaMobileAlt },
    { id: 'FaCoins', component: FaCoins },
    { id: 'FaMoneyBillWave', component: FaMoneyBillWave },
    { id: 'FaDollarSign', component: FaDollarSign },
    { id: 'FaChartLine', component: FaChartLine },
    { id: 'FaHandHoldingUsd', component: FaHandHoldingUsd },
    { id: 'FaMoneyCheckAlt', component: FaMoneyCheckAlt },
    { id: 'FaShoppingCart', component: FaShoppingCart },
  ];

  return (
    <div className="create-wallet-modal-overlay">
      <div className="create-wallet-modal">
        <div className="create-wallet-modal-header">
          <h2>Cree una billetera</h2>
          <button
            className="create-wallet-close-button"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>
        <div className="create-wallet-modal-body">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="create-wallet-form-group">
            <label htmlFor="wallet-amount">Cantidad</label>
            <input
              type="number"
              id="wallet-amount"
              className="create-wallet-cantidad-input"
              value={walletAmount}
              onChange={(e) => setWalletAmount(e.target.value)}
            />
          </div>
          <div className="create-wallet-form-group">
            <label htmlFor="wallet-name">Nombre de la billetera</label>
            <input
              type="text"
              id="wallet-name"
              className="create-wallet-nombre-input"
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
            />
          </div>
          <div className="create-wallet-form-group">
            <label>Símbolos</label>
            <div className="create-wallet-icons-grid">
              {icons.map(({ id, component: Icon }) => (
                <button
                  key={id}
                  className={`create-wallet-icon ${walletIcon === id ? 'selected' : ''}`}
                  onClick={() => setWalletIcon(id)}
                  onKeyDown={(e) => e.key === 'Enter' && setWalletIcon(id)}
                  type="button"
                  aria-label={`Seleccionar ícono ${id}`}
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="create-wallet-modal-footer">
          <button
            className="create-wallet-create-button"
            onClick={handleCreateWallet}
            aria-label="Crear billetera"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
}

CreateWalletModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Indica si el modal está abierto
  onClose: PropTypes.func.isRequired, // Función para cerrar el modal
  onWalletCreated: PropTypes.func.isRequired, // Función para notificar que se creó una billetera
};

export default CreateWalletModal;
