import PropTypes from "prop-types";
import emojiDictionary from "../../../utils/emojiDictionary";

function IconSelector({ selectedIcon, onSelectIcon, error }) {
  return (
    <div className="form-group">
      <label htmlFor="iconInput">Símbolo</label>
      <div className="icons-grid">
        {Object.entries(emojiDictionary).map(([key, emoji]) => (
          <button
            key={key}
            id="iconInput"
            aria-label={key}
            onClick={() => onSelectIcon(key)}
            className={`icons-grid-button ${
              key === selectedIcon ? "active" : ""
            }`}
          >
            <span>{emoji}</span>
          </button>
        ))}
      </div>
      {error && <span className="error-text">Selecciona un ícono.</span>}
    </div>
  );
}
IconSelector.propTypes = {
  selectedIcon: PropTypes.string.isRequired,
  onSelectIcon: PropTypes.func.isRequired, // Propiedades correctamente definidas
  error: PropTypes.bool,
};

export default IconSelector;
