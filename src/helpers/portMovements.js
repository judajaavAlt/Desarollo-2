import supabase from "../apis/supa-base-api.js";

// Create a new movement
// Input: 
//       Date movementDate: Date of the movement
//       String movementName: Name of the movement
//       Int movementAmount: Amount of the movement
//       Int userID: ID of the user related to the movement
//       Int categoryID: ID of the category related to the movement
//       Int walletID: ID of the wallet related to the movement
// Returns: Nothing
async function createMovement(ImovementDate, ImovementName, ImovementAmount, IuserID, IcategoryID, IwalletID) {
  const data = {
    movementDate: ImovementDate,
    movementName: ImovementName,
    movementAmount: ImovementAmount,
    userID: IuserID,
    categoryID: IcategoryID,
    walletID: IwalletID,
  };

  const { error } = await supabase.from("Movement")
                                  .insert(data);

  if (error != null) {
    const outPutError = "error code:" + error.code + ", error description:" + error.message;
    throw Error(outPutError);
  }
}

// Read movements by user ID and date range
// Input: 
//       Int userID: ID of the user
// Returns: Array of movements
async function readMovements(userID) {
 

  const { data, error } = await supabase.from("Movement")
                                        .select()
                                        .eq("userID", userID);
                                        
  if (error) {
    const outPutError = "error code:" + error.code + ", error description:" + error.message;
    throw Error(outPutError);
  } else {
    return data;
  }
}

// Update an existing movement
// Input: 
//       Int movementID: ID of the movement to update
//       Date movementDate: New date of the movement
//       String movementName: New name of the movement
//       Int movementAmount: New amount for the movement
//       Int categoryID: New category ID for the movement
//       Int walletID: New wallet ID for the movement
// Returns: Nothing
async function updateMovement(ImovementID, ImovementDate, ImovementName, ImovementAmount, IcategoryID, IwalletID) {
  const data = {
    movementDate: ImovementDate,
    movementName: ImovementName,
    movementAmount: ImovementAmount,
    categoryID: IcategoryID,
    walletID: IwalletID,
  };

  const { error } = await supabase.from("Movement")
                                  .update(data)
                                  .eq("movementID", ImovementID);

  if (error != null) {
    const outPutError = "error code:" + error.code + ", error description:" + error.message;
    throw Error(outPutError);
  }
}

// Delete a movement by ID
// Input: 
//       Int movementID: ID of the movement to delete
// Returns: Nothing
async function deleteMovement(ImovementID) {
  const { data, error } = await supabase.from("Movement")
                                        .delete()
                                        .eq("movementID", ImovementID)
                                        .select();

  if (data == null) {
    const outPutError = "error code:" + error.code + ", error description:" + error.message;
    throw Error(outPutError);
  } else {
    return data;
  }
}

export { createMovement, readMovements, updateMovement, deleteMovement };
