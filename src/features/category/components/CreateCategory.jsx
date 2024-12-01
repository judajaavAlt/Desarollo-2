import { useEffect, useState } from "react";
import "../styles/CreateCategory.css"; // Asegúrate de tener estilos asociados
import PropTypes from "prop-types";

//COMPONENTS
import ModalHeader from "../ModalHeader/ModalHeader";
import CategoryNameInput from "../CategoryNameInput/CategoryNameInput";
import IconSelector from "../IconSelector/IconSelector";
import ModalFooter from "../ModalFooter/ModalFooter";

function CategoryModal({ isOpen, onClose, data, action, typeAction }) {
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

CategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
  action: PropTypes.func,
  typeAction: PropTypes.string,
};

export default CategoryModal;
