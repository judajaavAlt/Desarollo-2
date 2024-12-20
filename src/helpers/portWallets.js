import  supabase  from "../apis/supa-base-api.js";

// Create a new wallet
// Input: 
//       String walletname: Name of the wallet
//       Int walletAmount: Wallet amount
//       String walletIcon: Wallet icon
//       Int userID: User ID
// Returns: Nothing
async function  createWallet(IwalletName, IwalletAmount, IwalletIcon, IuserID){
  const data = {walletName:IwalletName,
                walletAmount:IwalletAmount,
                walletIcon:IwalletIcon,
                userID:IuserID
  };
  const {error} = await supabase.from("Wallet")
                                .insert(data);
                                
  if (error != null)
  {
    const outPutError = "error code:"  + error.code + ", error description:" + error.message;
    throw Error(outPutError);
  }}

// Read a wallet by user ID
// Input: 
//       Int userID: User ID
// Returns: Nothing
async function  readWallet(userID){
  const {data, error} = await supabase.from("Wallet")
                                      .select()
                                      .eq("userID", userID);
  if (data == null)
  {
    const outPutError = "error code:"  + error.code + ", error description:" + error.message;
    throw Error(outPutError);
  }
  else {return data;}}

// Update an existing wallet
// Input: 
//       Int walletID: ID of the wallet to update
//       String walletname: New name for the wallet
//       Int walletAmount: New amount for the wallet
//       String walletIcon: New icon for the wallet
//       Int userID: User ID
// Returns: Nothing
async function  updateWallet(walletID, IwalletName, IwalletAmount, IwalletIcon, IuserID){
  const data = {walletName:IwalletName,
                walletAmount:IwalletAmount,
                walletIcon:IwalletIcon,
                userID:IuserID
  };
  const {error} = await supabase.from("Wallet")
                                .update(data)
                                .eq("walletID", walletID);
  if (error != null)
  {
    const outPutError = "error code:"  + error.code + ", error description:" + error.message;
    throw Error(outPutError);
  }}

// Delate a wallet by ID
// Input: 
//       Int walletID: ID of the wallet to delete
// Returns: Nothing
async function deleteWallet(walletID){
  const {data, error} = await supabase.from("Wallet")
                                      .delete()
                                      .eq("walletID", walletID)
                                      .select();
  if (data == null)
  {
    const outPutError = "error code:"  + error.code + ", error description:" + error.message;
    throw Error(outPutError);
  }
  else {return data;}}

export { readWallet, createWallet, updateWallet, deleteWallet };