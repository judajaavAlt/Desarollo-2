import CreateCategoryModal from "./crud/CreateCategory";
import { useState } from "react";
import "./CategoryList.css";
import { createCategory } from "../../helpers/portCategory";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeCategory, setTypeCategory] = useState(true);
  const [active, setActive] = useState("ingresos");

  const [cat, setCat] = useState({
    categoryName: "",
    categoryIcon: "",
    incomeOrExpense: false,
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onEditClick = () => {
    console.log(cat);
  };

  const onCreateClick = () => {
    console.log(cat);

    //createCategory(cat);

    console.log("creadaaaaaaaaa");
  };

  return (
    <div className="transaction-list">
      {
        //<SideBar><sideBar/>
      }

      <div className="toggle-buttons">
        <button
          className={`button ${active === "ingresos" ? "active" : ""}`}
          onClick={() => {
            setActive("ingresos");
            setTypeCategory(true);
            setCat((prevState) => ({
              ...prevState,
              incomeOrExpense: true,
            }));
          }}
        >
          INGRESOS
        </button>
        <button
          className={`button ${active === "egresos" ? "active" : ""}`}
          onClick={() => {
            setActive("egresos");
            setTypeCategory(false);
            setCat((prevState) => ({
              ...prevState,
              incomeOrExpense: false,
            }));
          }}
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
                <button onClick={onEditClick}>
                  <span>{emojiDictionary[category.categoryIcon]}</span>
                  <p>{category.categoryName}</p>
                </button>
              </li>
            ) : null
          )}

          {/* Botón para crear */}
          <li className="category-item">
            <button onClick={openModal}>
              <span>➕</span>
              <p>Crear</p>
            </button>
          </li>
        </ul>
      </div>

      <CreateCategoryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        cat={cat}
        setCat={setCat}
        onCreate={onCreateClick}
      />
    </div>
  );
}

export default CategoryList;
