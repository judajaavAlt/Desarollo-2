import CreateCategoryModal from "./crud/CreateCategory";
import { useState } from "react";
import "./CategoryList.css";
import {
  readCategoriesByType,
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

const categories = [
  {
    categoryID: 1,
    categoryName: "Food",
    categoryIcon: "ham", // Clave que referencia el diccionario
    incomeOrExpense: false,
  },
  {
    categoryID: 2,
    categoryName: "Salary",
    categoryIcon: "money",
    incomeOrExpense: true,
  },
  {
    categoryID: 3,
    categoryName: "Entertainment",
    categoryIcon: "game",
    incomeOrExpense: false,
  },
  {
    categoryID: 4,
    categoryName: "Investment",
    categoryIcon: "chart",
    incomeOrExpense: true,
  },
];

function CategoryList() {
  const [typeCategory, setTypeCategory] = useState(true);
  const [modalState, setModalState] = useState({
    isOpen: false,
    data: null,
    typeAction: "",
  });

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
    };
    console.log(enhancedCat);

    const kev = await readCategoriesByType(true);

    console.log(kev);

    if (type === "create") {
      console.log("crearaaaaaaaaa");
      // await  createCategory(enhancedCat);
    } else if (type === "update") {
      console.log("editttttttttttttttttttttttttt");
      //updateCategory(enhancedCat);
    } else {
      console.log("eliminarrrrrrrrrrrrrrrrrrrrr");
      //await  deleteCategory(enhancedCat);
    }
  };

  return (
    <div className="transaction-list">
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
