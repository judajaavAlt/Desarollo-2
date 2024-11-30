import PropTypes from "prop-types";

function CategoryNameInput({ value, onChange, error }) {
  return (
    <div className="form-group">
      <label htmlFor="categoryName">Nombre de la categoría</label>
      <input
        id="categoryName"
        type="text"
        placeholder="Introduzca un nombre de categoría"
        value={value}
        onChange={onChange}
      />
      {error && <span className="error-text">El nombre es obligatorio.</span>}
    </div>
  );
}
CategoryNameInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
};

export default CategoryNameInput;
