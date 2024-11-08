
import PropTypes from 'prop-types'; // Importar PropTypes
import './CreateWalletModal.css'; // Asegúrate de tener estilos asociados

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
            <input type="number" value="0" />
          </div>

          <div className="form-group">
            <label>Nombre de la billetera</label>
            <input type="text" placeholder="Introduzca un nombre de billetera" />
          </div>

          <div className="form-group">
            <label>Símbolos</label>
            <div className="icons-grid">
              {/* Asegúrate de tener los íconos disponibles */}
              <img src="/path/to/icon1.png" alt="Icon1" />
              <img src="/path/to/icon2.png" alt="Icon2" />
              <img src="/path/to/icon3.png" alt="Icon3" />
              {/* Más íconos según sea necesario */}
            </div>
          </div>

          <div className="form-group">
            <label>Color</label>
            <div className="color-options">
              <button className="color red"></button>
              <button className="color blue"></button>
              <button className="color green"></button>
              <button className="color yellow"></button>
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
