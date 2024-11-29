import SmallModal from "../../generics/SmallModal/SmallModal";
import PropTypes from "prop-types";
import { deleteTransaction } from "../../../helpers/portTransaccion";

const DeleteTransaction = ({ isOpen, onClose, transactionID }) => {
  // Maneja la confirmación de eliminación
  const handleConfirm = async () => {
    console.log(transactionID)
    try {
      await deleteTransaction(transactionID); // Llama a la función para eliminar la transacción
      onClose(); // Cierra el modal
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    
    <SmallModal
      isOpen={isOpen}
      onClose={onClose}
      title="Borrar Transacción"
      message="¿Deseas borrar esta transacción?"
      onConfirm={handleConfirm} // Pasa la lógica de confirmación al SmallModal
    />
  );
};

DeleteTransaction.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteTransaction;