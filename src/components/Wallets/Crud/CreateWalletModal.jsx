import PropTypes from 'prop-types'; // Importar PropTypes
import './CreateWalletModal.css'; // Asegúrate de tener estilos asociados
import { FaWallet, FaPiggyBank, FaUniversity, FaCreditCard, FaMobileAlt, FaCoins, FaMoneyBillWave, FaDollarSign, FaChartLine, FaHandHoldingUsd, FaMoneyCheckAlt, FaShoppingCart } from 'react-icons/fa'; // Importar íconos relacionados con finanzas

function CreateWalletModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Cree una billetera</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Cantidad</label>
            <input type="number" className="cantidad-input" value="0" />
          </div>

          <div className="form-group">
            <label>Nombre de la billetera</label>
            <input type="text" className="nombre-input" placeholder="Introduzca un nombre de billetera" />
          </div>

          <div className="form-group">
            <label>Símbolos</label>
            <div className="icons-grid">
              {/* 12 íconos relacionados con finanzas */}
              <FaWallet title="Billetera" className="icon" />
              <FaPiggyBank title="Ahorro" className="icon" />
              <FaUniversity title="Banco" className="icon" />
              <FaCreditCard title="Tarjeta de Crédito" className="icon" />
              <FaMobileAlt title="Pagos Móviles" className="icon" />
              <FaCoins title="Monedas" className="icon" />
              <FaMoneyBillWave title="Dinero en Efectivo" className="icon" />
              <FaDollarSign title="Dólares" className="icon" />
              <FaChartLine title="Inversiones" className="icon" />
              <FaHandHoldingUsd title="Fondos" className="icon" />
              <FaMoneyCheckAlt title="Cheques" className="icon" />
              <FaShoppingCart title="Gastos" className="icon" />
            </div>
          </div>

        </div>
        <div className="modal-footer">
          <button className="create-button">Crear</button>
        </div>
      </div>
    </div>
  );
}

// Definir PropTypes para validar las props
CreateWalletModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,  // isOpen es un booleano requerido
  onClose: PropTypes.func.isRequired, // onClose es una función requerida
};

export default CreateWalletModal;
