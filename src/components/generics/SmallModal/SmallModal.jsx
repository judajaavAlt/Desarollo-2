import PropTypes from 'prop-types';
import './SmallModal.css'; // Asegúrate de crear este archivo CSS

const SmallModal = ({ isOpen, onClose, title, message, onConfirm }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="small-modal-container">
          <div className="small-modal-header">
            <h2>{title}</h2>
          </div>
          <div className="small-modal-body">
            <p>{message}</p>
          </div>
          <div className="small-modal-footer">
            <button className="button-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button className="button-confirm" onClick={onConfirm}>
              Confirmar
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  SmallModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
  };
  
  export default SmallModal;