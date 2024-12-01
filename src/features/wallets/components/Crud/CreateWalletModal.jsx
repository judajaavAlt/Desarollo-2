import PropTypes from 'prop-types'; // Importar PropTypes
import '../../styles/CreateWalletModal.css'; // Asegúrate de tener estilos asociados
import { FaWallet, FaPiggyBank, FaUniversity, FaCreditCard, FaMobileAlt, FaCoins, FaMoneyBillWave, FaDollarSign, FaChartLine, FaHandHoldingUsd, FaMoneyCheckAlt, FaShoppingCart } from 'react-icons/fa'; // Importar íconos relacionados con finanzas

function CreateWalletModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="create-wallet-modal-overlay">
      <div className="create-wallet-modal">
        <div className="create-wallet-modal-header">
          <h2>Cree una billetera</h2>
          <button className="create-wallet-close-button" onClick={onClose}>×</button>
        </div>
        <div className="create-wallet-modal-body">
          <div className="create-wallet-form-group">
            <label>Cantidad</label>
            <input type="number" className="create-wallet-cantidad-input" value="0" />
          </div>

          <div className="create-wallet-form-group">
            <label>Nombre de la billetera</label>
            <input type="text" className="create-wallet-nombre-input" placeholder="Introduzca un nombre de billetera" />
          </div>

          <div className="create-wallet-form-group">
            <label>Símbolos</label>
            <div className="create-wallet-icons-grid">
              {/* 12 íconos relacionados con finanzas */}
              <FaWallet title="Billetera" className="create-wallet-icon" />
              <FaPiggyBank title="Ahorro" className="create-wallet-icon" />
              <FaUniversity title="Banco" className="create-wallet-icon" />
              <FaCreditCard title="Tarjeta de Crédito" className="create-wallet-icon" />
              <FaMobileAlt title="Pagos Móviles" className="create-wallet-icon" />
              <FaCoins title="Monedas" className="create-wallet-icon" />
              <FaMoneyBillWave title="Dinero en Efectivo" className="create-wallet-icon" />
              <FaDollarSign title="Dólares" className="create-wallet-icon" />
              <FaChartLine title="Inversiones" className="create-wallet-icon" />
              <FaHandHoldingUsd title="Fondos" className="create-wallet-icon" />
              <FaMoneyCheckAlt title="Cheques" className="create-wallet-icon" />
              <FaShoppingCart title="Gastos" className="create-wallet-icon" />
            </div>
          </div>

        </div>
        <div className="create-wallet-modal-footer">
          <button className="create-wallet-create-button">Crear</button>
        </div>
      </div>
    </div>
  );
}

CreateWalletModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // isOpen es un booleano requerido
  onClose: PropTypes.func.isRequired, // onClose es una función requerida
};

export default CreateWalletModal;
