import CreateCategoryModal from "./crud/CreateCategory";
import { useState, useEffect } from "react";
import "./CategoryList.css";
import {
  readCategoriesByUserId,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../helpers/portCategory";

const emojiDictionary = {
  ham: "🍔",
  money: "💵",
  game: "🎮",
  chart: "📈",
};

function CategoryList() {
  const usuario_id = 1;
  const [typeCategory, setTypeCategory] = useState(true);
  const [categories, setCategories] = useState([]);
  const [modalState, setModalState] = useState({
    isOpen: false,
    data: null,
    typeAction: "",
  });

  useEffect(() => {
    const traer = async () => {
      const kev = await readCategoriesByUserId(usuario_id);
      setCategories(kev);
    };
    traer();
  }, []);

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
    console.log(enhancedCat);

    try {
      if (type === "create") {
        console.log("crearaaaaaaaaa");
        await createCategory(enhancedCat);
      } else if (type === "update") {
        console.log("editttttttttttttttttttttttttt");
        await updateCategory(enhancedCat);
      } else {
        console.log("eliminarrrrrrrrrrrrrrrrrrrrr");
        await deleteCategory(enhancedCat);
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
      {
        //<SideBar><sideBar/>
      }

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
                  <span>{emojiDictionary[category.categoryIcon]}</span>
                  <p>{category.categoryName}</p>
                </button>
              </li>
            ) : null
          )}

          {/* Botón para crear */}
          <li className="category-item">
            <button onClick={openCreateModal}>
              <span>➕</span>
              <p>Crear</p>
            </button>
          </li>
        </ul>
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

export default CategoryList;
