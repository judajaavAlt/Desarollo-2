import { useEffect, useState } from "react";
import "./CreateCategory.css"; // Asegúrate de tener estilos asociados
import emojiDictionary from "../../utils/emojiDictionary";
import PropTypes from "prop-types";

function ModalHeader({ isCreate }) {
  return <h2>{isCreate ? "CREAR CATEGORÍA" : "EDITAR CATEGORÍA"}</h2>;
}
ModalHeader.propTypes = {
  isCreate: PropTypes.bool.isRequired,
};

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

function CreateCategoryModal({ isOpen, onClose, data, action, typeAction }) {
  const [errors, setErrors] = useState({ name: false, icon: false });
  const isCreate = !data;

  const [cat, setCat] = useState(
    data || {
      categoryID: "",
      categoryName: "",
      categoryIcon: "",
      incomeOrExpense: "",
    },
  );

  useEffect(() => {
    if (isCreate) {
      setCat({
        categoryID: "",
        categoryName: "",
        categoryIcon: "",
        incomeOrExpense: "",
      });
    } else {
      setCat(data);
    }
    setErrors({ name: false, icon: false });
  }, [isOpen, data, isCreate]);

  // Manejador de cambio para actualizar el valor de categoryName
  const handleNameChange = (event) => {
    const newValue = event.target.value;
    setCat((prevState) => ({
      ...prevState,
      categoryName: newValue,
    }));
    if (newValue.trim()) {
      setErrors((prev) => ({ ...prev, name: false })); // Limpiamos el error si aplica
    }
  };

  // Manejador de cambio para actualizar el valor de categoryIcon
  const handleIconChange = (icon) => {
    setCat((prevState) => ({
      ...prevState,
      categoryIcon: icon,
    }));
    setErrors((prev) => ({ ...prev, icon: false })); // Limpiamos el error
  };

  // Validar datos antes de crear
  const handleCreate = (type) => {
    const hasNameError = !cat.categoryName.trim();
    const hasIconError = !cat.categoryIcon;

    if (hasNameError || hasIconError) {
      setErrors({ name: hasNameError, icon: hasIconError });
      return;
    }

    action(cat, type);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <ModalHeader isCreate={isCreate} />
        </div>

        <div className="modal-body">
          <CategoryNameInput
            value={cat.categoryName}
            onChange={handleNameChange}
            error={errors.name}
          />

          <IconSelector
            selectedIcon={cat.categoryIcon}
            onSelectIcon={handleIconChange}
            error={errors.icon}
          />
        </div>

        <ModalFooter
          isCreate={isCreate}
          onClose={onClose}
          onCreate={handleCreate}
          typeAction={typeAction}
        />
      </div>
    </div>
  );
}

CreateCategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
  action: PropTypes.func,
  typeAction: PropTypes.string,
};

export default CreateCategoryModal;
