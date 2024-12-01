import CreateCategoryModal from "../components/CreateCategory";
import { useState, useEffect } from "react";
import {
  readCategoriesByUserId,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../helpers/portCategory";
import "../styles/CategoryList.css";

function CategoryPage() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const usuario_id = userData[0]["userID"];

  const [typeCategory, setTypeCategory] = useState(true);
  const [categories, setCategories] = useState([]);
  const [modalState, setModalState] = useState({
    isOpen: false,
    data: null,
    typeAction: "",
  });
  const [loading, setLoading] = useState(true); // Nuevo estado de carga

  useEffect(() => {
    const traer = async () => {
      try {
        const kev = await readCategoriesByUserId(usuario_id);
        setCategories(kev);
      } catch (e) {
        console.error("Error al cargar categorías:", e);
      } finally {
        setLoading(false); // Cambia el estado de carga una vez se obtienen los datos
      }
    };
    traer();
  }, [usuario_id]);

  const openCreateModal = () => {
    setModalState({ isOpen: true, data: null, typeAction: "create" });
  };

  const openEditModal = (data) => {
    setModalState({ isOpen: true, data: data, typeAction: "update" });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, data: null, typeAction: "" });
  };

  const handleAction = async (cat, type) => {
    const enhancedCat = {
      ...cat,
      incomeOrExpense: typeCategory,
      userID: usuario_id,
    };

    try {
      if (type === "create") {
        await createCategory(
          enhancedCat.categoryName,
          enhancedCat.categoryIcon,
          enhancedCat.incomeOrExpense,
          enhancedCat.userID,
        );
      } else if (type === "update") {
        await updateCategory(
          enhancedCat.categoryID,
          enhancedCat.categoryName,
          enhancedCat.categoryIcon,
          enhancedCat.incomeOrExpense,
        );
      } else {
        await deleteCategory(enhancedCat.categoryID);
      }
    } catch (e) {
      console.error("Error en la acción:", e.message);
      alert("Hubo un error al procesar la solicitud. Inténtalo nuevamente.");
    } finally {
      console.log("Acción finalizada.");
      const kev = await readCategoriesByUserId(usuario_id);
      setCategories(kev);
      closeModal();
    }
  };

  return (
    <div className="content">
      <div className="toggle-buttons">
        <button
          className={`button ${typeCategory ? "active" : ""}`}
          onClick={() => setTypeCategory(true)}
        >
          INGRESOS
        </button>
        <button
          className={`button ${!typeCategory ? "active" : ""}`}
          onClick={() => setTypeCategory(false)}
        >
          EGRESOS
        </button>
      </div>

      <div>
        <h3 className="title">Categorías</h3>
        {loading ? (
          // Aquí agregamos una animación de carga
          <div className="loading-spinner">
            <span>Loading...</span>
          </div>
        ) : (
          <ul className="list-categories">
            {categories.map((category) =>
              typeCategory === category.incomeOrExpense ? (
                <li key={category.categoryID} className="category-item">
                  <button
                    onClick={() =>
                      openEditModal({
                        categoryID: category.categoryID,
                        categoryName: category.categoryName,
                        categoryIcon: category.categoryIcon,
                      })
                    }
                  >
                    <span>{category.categoryIcon}</span>
                    <p>{category.categoryName}</p>
                  </button>
                </li>
              ) : null,
            )}

            {
              // Botón para crear
            }
            <li className="category-item">
              <button onClick={openCreateModal}>
                <span>➕</span>
                <p>Crear</p>
              </button>
            </li>
          </ul>
        )}
      </div>

      <CreateCategoryModal
        isOpen={modalState["isOpen"]}
        onClose={closeModal}
        data={modalState["data"]}
        action={handleAction}
        typeAction={modalState["typeAction"]}
      />
    </div>
  );
}

export default CategoryPage;
