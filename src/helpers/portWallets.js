import  supabase  from "../apis/supa-base-api.js"

async function  createWallet(IwalletName, IwalletAmount, IwalletIcon, IuserID){
  const data = {walletName:IwalletName,
                walletAmount:IwalletAmount,
                walletIcon:IwalletIcon,
                userID:IuserID
  }
  const {error} = await supabase.from("Wallet")
                                .insert(data)
                                
  if (error != null)
  {throw new Error (error)}}


async function  readWallet(userID){
  const {data, error} = await supabase.from("Wallet")
                                      .select()
                                      .eq("Wallet.userID", userID)
  if (data == null)
  {throw new Error (error)}
  else {return data}}

async function  updateWallet(walletID, IwalletName, IwalletAmount, IwalletIcon, IuserID){
  const data = {walletName:IwalletName,
                walletAmount:IwalletAmount,
                walletIcon:IwalletIcon,
                userID:IuserID
  }
  const {error} = await supabase.from("Wallet")
                                .update(data)
                                .eq("walletID", walletID)
  if (error != null)
  {throw new Error (error)}}

async function  deleteWallet(walletID){
  const {data, error} = await supabase.from("Wallet")
                                      .delete()
                                      .eq("walletID", walletID)
                                      .select()
  if (data == null)
  {throw new Error (error)}
  else {return data}}

export { readWallet, createWallet, updateWallet, deleteWallet }