import supabase from "../apis/supa-base-api.js";

// Create a new user
// Input:
//       String name: name of the user
//       String email: email of the user, it will be used to login
//       String password: password provided by the user, it will be used to login
// Returns: Nothing

async function createUser(Iname, Iemail, Ipassword) {
  const data = {
    name: Iname,
    email: Iemail,
    password: Ipassword,
  };
  const { error } = await supabase.from("User").insert(data);
  if (error != null) {
    const outPutError =
      "error code:" + error.code + ", error description:" + error.message;
    throw Error(outPutError);
  }
}

// Read an user data
// Input:
//       Int userID: ID of the user who will be read
// Returns: Nothing

async function readUser(email) {
  const { data, error } = await supabase
    .from("User")
    .select()
    .eq("email", email);

  if (error) {
    const outPutError =
      "Error code: " + error.code + ", error description: " + error.message;
    throw new Error(outPutError);
  }

  if (!data || data.length === 0) {
    throw new Error("User not found");
  }

  return data;
}

// Update an user data
// Input:
//       String name: name of the user to update
//       String email: email of the user to update
//       String password: password provided by the user that will be updated
// Returns: Nothing
async function updateUser(Iname, Iemail, Ipassword) {
  const data = {
    name: Iname,
    email: Iemail,
    password: Ipassword,
  };

  const { error } = await supabase.from("User").insert(data);
  if (error != null) {
    const outPutError =
      "error code:" + error.code + ", error description:" + error.message;
    throw Error(outPutError);
  }
}

//Delete an user data
// Input:
//       Int userID: ID of the user who will be delete
// Returns: Nothing
async function deleteUser(userID) {
  const { data, error } = await supabase
    .from("User")
    .delete()
    .eq("userID", userID)
    .select();
  if (data == null) {
    const outPutError =
      "error code:" + error.code + ", error description:" + error.message;
    throw Error(outPutError);
  } else {
    return data;
  }
}

export { createUser, readUser, updateUser, deleteUser };
