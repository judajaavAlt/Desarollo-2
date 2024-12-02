import PropTypes from "prop-types";
import "./Button.css"

const Button = ({ text, onClick, className }) => (
  <button className={`button-create ${className}`} onClick={onClick}>
    {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired, // 'text' debe ser una cadena y es obligatorio
  onClick: PropTypes.func.isRequired, // 'onClick' debe ser una función y es obligatorio
  className: PropTypes.string, // 'className' es opcional y debe ser una cadena
};

Button.defaultProps = {
  className: "", // Valor por defecto para 'className'
};

export default Button;
