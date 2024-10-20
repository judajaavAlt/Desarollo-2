import { createWallet, deleteWallet, readWallet } from "../src/helpers/portWallets";

// Prueba para la creación de la billetera
const testCreateWallet = async () => {
  const IwalletName = 'Test Wallet';
  const IwalletAmount = 500;
  const IwalletIcon = 'test_icon.png';
  const IuserID = 1;


    // Llama a la funcion que se encarga de crear la billetera
    await expect(createWallet(IwalletName, IwalletAmount, IwalletIcon, IuserID)).resolves.not.toThrow(Error);

    // Selecciona la billetera creada para obtener su ID
    const { data: wallets, error: selectError } = await supabase
      .from("Wallet")
      .select("*")
      .eq("walletName", IwalletName)
      .eq("userID", IuserID)
      .eq("walletAmount", IwalletAmount)
      .eq("walletIcon", IwalletIcon);

    if (selectError) {
      throw new Error("Error al seleccionar la billetera: " + selectError.message);
    }

    if (!wallets || wallets.length === 0) {
      throw new Error("No se encontró la billetera recién creada");
    }

    // Toma el ID de la billetera para eliminarla
    const walletID = wallets[0].walletID;
    const { error: deleteError } = await deleteWallet(walletID);

    // Verifica si hubo un error al eliminar
    if (deleteError) {
      throw new Error("Error al eliminar la billetera: " + deleteError.message);
    }
  
};

//Realiza la prueba con Jest
test("Create wallet test", testCreateWallet);

// Prueba para leer una billetera específica
const testReadWallet = () => {return expect(readWallet(1)).resolves.not.toBeNull();};

test("Delete wallet handle Error test", testReadWallet);

//===============================================================================================================

const testDeleteWalletSuccess = () => {deleteWallet(500).then(data => {expect(data).not.toBeNull();});};

test("Delete wallet sucess test", testDeleteWalletSuccess);

const testDeleteWalletHandleError = () => {return expect(deleteWallet()).rejects.toThrow();};

test("Delete wallet handle Error test", testDeleteWalletHandleError);