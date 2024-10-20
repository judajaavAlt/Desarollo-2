import SmallModal from "../../generics/SmallModal/SmallModal";
import PropTypes from "prop-types";
import "./DeleteTransaction.css";

const DeleteTransaction = ({ isOpen, onClose }) => {
  return (

    <SmallModal isOpen={isOpen} onClose={onClose} title="Borrar Transacción" message="¿Deseas borrar esta transacción?">

    </SmallModal>
  );
};

DeleteTransaction.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

export default DeleteTransaction;
