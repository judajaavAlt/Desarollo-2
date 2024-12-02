import PropTypes from "prop-types";
import "./InfoGroup.css";

const InfoGroup = ({ label, children }) => (
  <div className="info-group">
    <label>{label}</label>
    {children}
  </div>
);

InfoGroup.propTypes = {
  label: PropTypes.string.isRequired, // 'label' debe ser una cadena y es obligatorio
  children: PropTypes.node.isRequired, // 'children' puede ser cualquier tipo de contenido y es obligatorio
};

export default InfoGroup;
