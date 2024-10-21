import supabase from "../src/apis/supa-base-api";
import { createWallet, deleteWallet, readWallet } from "../src/helpers/portWallets";
import { createTransaction,deleteTransaction } from '../src/helpers/portTransaccion';

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

test("read wallet test", testReadWallet);

//===============================================================================================================
const testCreateTransaction = async () => {
  const wallet1 = {
    name: 'Test Wallet 1',
    amount: 1000000000,
    icon: 'icon1.png',
    userID: 1
  };
  const wallet2 = {
    name: 'Test Wallet 2',
    amount: 2000000000,
    icon: 'icon2.png',
    userID: 1
  };

  // Crear las dos billeteras
  await expect(createWallet(wallet1.name, wallet1.amount, wallet1.icon, wallet1.userID)).resolves.not.toThrow(Error);
  await expect(createWallet(wallet2.name, wallet2.amount, wallet2.icon, wallet2.userID)).resolves.not.toThrow(Error);
  // Obtener las billeteras creadas
  const { data: wallets, error: selectError } = await supabase
    .from("Wallet")
    .select("*")
    .in("walletName", [wallet1.name, wallet2.name]);

  if (selectError) {
    throw new Error("Error al seleccionar las billeteras: " + selectError.message);
  }

  if (!wallets || wallets.length !== 2) {
    throw new Error("No se encontraron las billeteras recién creadas");
  }
  
  //obtener IDs de las billeteras creadas
  const walletID1 = wallets[0].walletID;
  const walletID2 = wallets[1].walletID;

  // Crear la transacción usando los IDs de las billeteras
  const ItransactionDate = "2024/10/24";
  const ItransactionName = 'Test Transaction';
  const ItransactionAmount = 5000;

  await expect(createTransaction(ItransactionDate, ItransactionName, ItransactionAmount, walletID1, walletID2)).resolves.not.toThrow(Error);

  const { data: transaction, error: trasanctionError } = await supabase
      .from("Transaction")
      .select()
      .eq("transactionDate", ItransactionDate)
      .eq("transactionName", ItransactionName)
      .eq("destination", walletID1)
      .eq("from", wallet2);
  if (selectError) {
    throw new Error("Error al seleccionar la transaccion: " + trasanctionError.message);
  }
  const trasactionID = transaction[0].trasactionID;
    
  await expect(deleteTransaction(trasactionID)).resolves.not.toThrow(Error);  

  // Borrar las billeteras creadas
  await expect(deleteWallet(walletID1)).resolves.not.toThrow(Error);
  await expect(deleteWallet(walletID2)).resolves.not.toThrow(Error);
};

// Realiza la prueba con Jest
test("Create transaction test", testCreateTransaction);


//============================================================================================================================================================================
const testDeleteWalletSuccess = () => {deleteWallet(500).then(data => {expect(data).not.toBeNull();});};

test("Delete wallet sucess test", testDeleteWalletSuccess);

const testDeleteWalletHandleError = () => {return expect(deleteWallet()).rejects.toThrow();};

test("Delete wallet handle Error test", testDeleteWalletHandleError);
 

const testDeleteTransactionSuccess = () => {deleteTransaction(500).then(data => {expect(data).not.toBeNull();});};

test("Delete transaction sucess test", testDeleteTransactionSuccess);


const testDeleteTransactionHandleError = () => {return expect(deleteTransaction()).rejects.toThrow();};

test("Delete transaction handle Error test", testDeleteTransactionHandleError);