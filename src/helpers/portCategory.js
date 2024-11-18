import supabase from "../apis/supa-base-api.js";

// Create a new category
// Input: 
//       String categoryName: Name of the category
//       String categoryIcon: Icon of the category
//       String incomeOrExpense: Specifies if the category is for income or expense
// Returns: Nothing
async function createCategory(IcategoryName, IcategoryIcon, IincomeOrExpense) {
  const data = {
                categoryName: IcategoryName,
                categoryIcon: IcategoryIcon,
                incomeOrExpense: IincomeOrExpense
  };

  const { error } = await supabase.from("Category")
                                  .insert(data);

  if (error != null) {
    const outPutError = "error code:" + error.code + ", error description:" + error.message;
    throw Error(outPutError);
  }
}

// Read categories by type (income or expense)
// Input: 
//       String incomeOrExpense: Specifies if looking for income or expense categories
// Returns: Array of categories
async function readCategoriesByType(IincomeOrExpense) {
  const { data, error } = await supabase.from("Category")
                                        .select()
                                        .eq("incomeOrExpense", IincomeOrExpense);

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
async function updateCategory(IcategoryID, IcategoryName, IcategoryIcon, IincomeOrExpense) {
  const data = {
    categoryName: IcategoryName,
    categoryIcon: IcategoryIcon,
    incomeOrExpense: IincomeOrExpense
  };

  const { error } = await supabase.from("Category")
                                  .update(data)
                                  .eq("categoryID", IcategoryID);

  if (error != null) {
    const outPutError = "error code:" + error.code + ", error description:" + error.message;
    throw Error(outPutError);
  }
}

// Delete a category by ID
// Input: 
//       Int categoryID: ID of the category to delete
// Returns: Nothing
async function deleteCategory(IcategoryID) {
  const { data, error } = await supabase.from("Category")
                                        .delete()
                                        .eq("categoryID", IcategoryID)
                                        .select();

  if (data == null) {
    const outPutError = "error code:" + error.code + ", error description:" + error.message;
    throw Error(outPutError);
  } else {
    return data;
  }
}

export { createCategory, readCategoriesByType, updateCategory, deleteCategory };
