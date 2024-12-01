import PropTypes from "prop-types";

function ModalHeader({ isCreate }) {
  return <h2>{isCreate ? "CREAR CATEGORÍA" : "EDITAR CATEGORÍA"}</h2>;
}
ModalHeader.propTypes = {
  isCreate: PropTypes.bool.isRequired,
};

export default ModalHeader;
