import PropTypes from "prop-types";

function ModalFooter({ isCreate, onClose, onCreate, typeAction }) {
  return (
    <div className="modal-footer">
      <button
        className="close-button"
        onClick={isCreate ? onClose : () => onCreate("delete")}
      >
        {isCreate ? "CANCELAR" : "BORRAR"}
      </button>
      <button className="create-button" onClick={() => onCreate(typeAction)}>
        {isCreate ? "CREAR" : "CONFIRMAR"}
      </button>
    </div>
  );
}
ModalFooter.propTypes = {
  isCreate: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  typeAction: PropTypes.string.isRequired,
};

export default ModalFooter;
