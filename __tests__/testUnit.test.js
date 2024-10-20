// Importa solo las funciones que necesitas
import supabase from "../src/apis/supa-base-api";
import { createWallet, deleteWallet, readWallet } from "../src/helpers/portWallets";

// Prueba para la creación de la billetera
const testCreateWallet = async () => {
  const IwalletName = 'Test Wallet';
  const IwalletAmount = 500;
  const IwalletIcon = 'test_icon.png';
  const IuserID = 1;

  try {
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
    console.log("Billetera creada correctamente:", walletID);
    const { error: deleteError } = await deleteWallet(walletID);

    // Verifica si hubo un error al eliminar
    if (deleteError) {
      throw new Error("Error al eliminar la billetera: " + deleteError.message);
    }
    //En caso de que se elimine correctamente se muestra el siguiente mensaje
    console.log("Billetera eliminada correctamente:", walletID);
  } catch (error) {
    console.error("Error al crear o eliminar la billetera:", error.message); // Imprimir mensaje de error legible
    throw error; // Re-lanzar el error para que la prueba falle si hay un problema
  }
};

// Realiza la prueba con Jest
test("Create wallet test", testCreateWallet);


const testReadWallet = ()=>{return expect(readWallet).not.toThrow(Error);};

test("Read wallet test", testReadWallet);
