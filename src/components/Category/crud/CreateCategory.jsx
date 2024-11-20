import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "./CreateCategory.css"; // Asegúrate de tener estilos asociados
import { deleteCategory } from "../../../helpers/portCategory";

const emojiDictionary = {
  ham: "🍔",
  money: "💵",
  game: "🎮",
  chart: "📈",
};

function CreateCategoryModal({ isOpen, onClose, data, action, typeAction }) {
  const [errors, setErrors] = useState({ name: false, icon: false });
  const isCreate = !data;

  const [cat, setCat] = useState(
    data
      ? data
      : {
          categoryID: "",
          categoryName: "",
          categoryIcon: "",
          incomeOrExpense: "",
        }
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
  }, [isOpen]);

  if (!isOpen) return null;

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

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{isCreate ? "CREAR CATEGORÍA" : "EDITAS"}</h2>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Nombre de la categoría</label>
            <input
              type="text"
              placeholder="Introduzca un nombre de categoría"
              value={cat.categoryName}
              onChange={handleNameChange}
            />
            {errors.name && (
              <span className="error-text">El nombre es obligatorio.</span>
            )}
          </div>

          <div className="form-group">
            <label>Símbolo</label>
            <div className="icons-grid">
              {Object.entries(emojiDictionary).map(([key, emoji]) => (
                <button
                  key={key}
                  role="img"
                  aria-label={key}
                  onClick={() => handleIconChange(key)}
                  className={`icons-grid-button ${
                    key === cat.categoryIcon ? "active" : ""
                  }`}
                >
                  <span>{emoji}</span>
                </button>
              ))}
            </div>
            {errors.icon && (
              <span className="error-text">Selecciona un ícono.</span>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="close-button"
            onClick={isCreate ? onClose : () => handleCreate("delete")}
          >
            {isCreate ? "CANCELAR" : "BORRAR"}
          </button>
          <button
            className="create-button"
            onClick={() => handleCreate(typeAction)}
          >
            {isCreate ? "CREAR" : "CONFIRMAR"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCategoryModal;