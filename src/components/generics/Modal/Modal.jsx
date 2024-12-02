import PropTypes from "prop-types";
import "./Modal.css";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="contenedor-modal">
        <div className="encabezado-modal">
          <h2>{title}</h2>
          <button className="button-close" onClick={onClose}>
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired, // 'children' puede ser cualquier tipo de contenido y es obligatorio
  isOpen: PropTypes.bool.isRequired, // 'isOpen' debe ser un booleano y es obligatorio
  onClose: PropTypes.func.isRequired, // 'onClose' debe ser una función y es obligatorio
  title: PropTypes.string.isRequired, // 'title' debe ser una cadena y es obligatorio
};

export default Modal;
