import PropTypes from 'prop-types'; // Importar PropTypes
import "../../styles/CreateTransaction.css";

const CreateTransaction = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay">
        <div className="contenedor-modal">
          <div className="encabezado-modal">
            <h2>Crear transferencia</h2>
            <button className="button-close" onClick={onClose}>x</button>
          </div>
          <div className="cuerpo-modal">
            <div className="info-group">
              <label> Transfiera de: </label>
              <select>
                <option value="Efectivo">Efectivo</option>
                <option value="Bancolombia">Bancolombia</option>
                <option value="Nequi">Nequi</option>
              </select>
            </div>
            <div className="info-group">
              <label> Transfiera a: </label>
              <select>
                <option value="Efectivo">Efectivo</option>
                <option value="Bancolombia">Bancolombia</option>
                <option value="Nequi">Nequi</option>
              </select>
            </div>
            <div className="info-group">
                <label>Cantidad:</label>
                <input type="number" value={0}></input>
            </div>
            <div className="date-group">
                <label>Fecha:</label>
                <input type="date"></input>
            </div>
            <div className="info-group">
                <label>Comentarios:</label>
                <textarea></textarea>
            </div>
            <div className="button-group">
                <button className="button-create">Crear</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Definir PropTypes para validar las props
CreateTransaction.propTypes = {
  isOpen: PropTypes.bool.isRequired,  // isOpen es un booleano requerido
  onClose: PropTypes.func.isRequired, // onClose es una función requerida
};

export default CreateTransaction;
