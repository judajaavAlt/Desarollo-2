import supabase from "../apis/supa-base-api.js";

// Create a new category
// Input: 
//       String categoryName: Name of the category
//       String categoryIcon: Icon of the category
//       String incomeOrExpense: Specifies if the category is for income or expense
//       int    userID: Specifies the user relation with category
// Returns: Nothing
async function createCategory(categoryName, categoryIcon, incomeOrExpense, userID) {
  const data = {
    categoryName,
    categoryIcon,
    incomeOrExpense,
    userID
  };

  try {
    const { error } = await supabase.from("Category").insert(data);

    if (error) {
      throw Error(`Código: ${error.code}, Descripción: ${error.message}`);
    }
  } catch (error) {
    console.error("Error al crear categoría:", error.message);
    throw error; // Re-lanzamos el error para que lo maneje el componente
  }
}

// Read categories by userId (userId)
// Input: 
//       int userId: Specifies categories to search according to userID
// Returns: Array of categories
async function readCategoriesByUserId(userId) {
  const { data, error } = await supabase.from("Category")
                                        .select()
                                        .eq("userID", userId);

  if (data == null) {
    const outPutError = "error code:" + error.code + ", error description:" + error.message;
    throw Error(outPutError);
  } else {
    return data;
  }
}

// Update an existing category
// Input: 
//       Int categoryID: ID of the category to update
//       String categoryName: New name of the category
//       String categoryIcon: New icon of the category
//       String incomeOrExpense: New type (income or expense) of the category
// Returns: Nothing
async function updateCategory(categoryID, categoryName, categoryIcon, incomeOrExpense) {
  const data = {
    categoryName,
    categoryIcon,
    incomeOrExpense,
  };

  try {
    const { error } = await supabase.from("Category").update(data).eq("categoryID", categoryID);

    if (error) {
      throw Error(`Código: ${error.code}, Descripción: ${error.message}`);
    }
  } catch (error) {
    console.error("Error al actualizar categoría:", error.message);
    throw error; // Re-lanzamos el error para que lo maneje el componente
  }
}

// Delete a category by ID
// Input: 
//       Int categoryID: ID of the category to delete
// Returns: Nothing
async function deleteCategory(categoryID) {
  const { data, error } = await supabase.from("Category")
                                        .delete()
                                        .eq("categoryID", categoryID)
                                        .select();

  if (data == null) {
    const outPutError = "error code:" + error.code + ", error description:" + error.message;
    throw Error(outPutError);
  } else {
    return data;
  }
}

export { createCategory, readCategoriesByUserId, updateCategory, deleteCategory };
