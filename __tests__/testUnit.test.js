import supabase from "../src/apis/supa-base-api";
import dayjs from "dayjs";
import { createWallet, deleteWallet, readWallet, updateWallet } from "../src/helpers/portWallets";
import { createTransaction,deleteTransaction, updateTransaction } from '../src/helpers/portTransaccion';

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
  
  const { data: wallets, error: selectError } = await supabase.from("Wallet")
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
  const ItransactionName = "Test Transaction";
  const ItransactionAmount = 500000;

  await expect(createTransaction(ItransactionDate, ItransactionName, ItransactionAmount, walletID1, walletID2)).resolves.not.toThrow(Error);

  const { data: transaction, error: transactionError } = await supabase.from("Transaction")
                                                                       .select()
                                                                       .eq("transactionName", ItransactionName)
                                                                       .eq("transactionAmount", ItransactionAmount)
                                                                       .eq("destination", walletID1);
                                                                       
  if (selectError) {
    throw new Error("Error al seleccionar la transaccion: " + transactionError.message);
  }

  const transactionID = transaction[0].transactionID;
    
  await expect(deleteTransaction(transactionID)).resolves.not.toThrow(Error);  

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

// Prueba para leer una transacción específica
const testReadTransaction = async () => {
  // Configuración de los datos de prueba
  const ItransactionDate = dayjs().format('YYYY-MM-DD'); // Fecha actual
  const ItransactionName = "Test Transaction";
  const ItransactionAmount = 100;
  const Idestination = 1; // ID de la billetera de destino (ejemplo)
  const Ifrom = 2; // ID de la billetera de origen (ejemplo)

  // Crear una nueva transacción
  await expect(
    createTransaction(ItransactionDate, ItransactionName, ItransactionAmount, Idestination, Ifrom)
  ).resolves.not.toThrow();

  // Leer directamente de supabase para confirmar la creación
  const { data: transactions, error } = await supabase
    .from("Transaction")
    .select("*")
    .eq("transactionName", ItransactionName)
    .eq("transactionAmount", ItransactionAmount)
    .eq("destination", Idestination)
    .eq("from", Ifrom);

  if (error) {
    throw new Error("Error al leer la transacción directamente de supabase: " + error.message);
  }

  // Verificar que la transacción creada esté presente en los resultados
  expect(transactions).not.toBeNull();
  expect(transactions.length).toBeGreaterThan(0);

  // Limpiar los datos de prueba eliminando la transacción creada
  const transactionID = transactions[0].transactionID;
  await expect(deleteTransaction(transactionID)).resolves.not.toThrow();
};

// Test Jest
test("read transaction test", testReadTransaction);

//===============================================================================================================

// Prueba para actualizar una billetera
const testUpdateWallet = async () => {
  const walletName = 'Wallet to Update';
  const walletAmount = 1000;
  const walletIcon = 'old_icon.png';
  const userID = 1;

  // Crear una billetera que se va a actualizar
  await createWallet(walletName, walletAmount, walletIcon, userID);

  // Seleccionar la billetera creada para obtener su ID
  const { data: wallets, error: selectError } = await supabase
    .from("Wallet")
    .select("*")
    .eq("walletName", walletName)
    .eq("userID", userID)
    .eq("walletAmount", walletAmount)
    .eq("walletIcon", walletIcon);

  if (selectError) {
    throw new Error("Error al seleccionar la billetera: " + selectError.message);
  }

  if (!wallets || wallets.length === 0) {
    throw new Error("No se encontró la billetera creada");
  }

  const walletID = wallets[0].walletID;

  // Definir nuevos valores para la actualización
  const newWalletName = 'Updated Wallet';
  const newWalletAmount = 1500;
  const newWalletIcon = 'new_icon.png';

  // Llamar a la función de actualización
  await expect(updateWallet(walletID, newWalletName, newWalletAmount, newWalletIcon, userID)).resolves.not.toThrow(Error);

  // Verificar que la billetera se haya actualizado correctamente
  const { data: updatedWallets, error: updatedSelectError } = await supabase
    .from("Wallet")
    .select("*")
    .eq("walletID", walletID);

  if (updatedSelectError) {
    throw new Error("Error al seleccionar la billetera actualizada: " + updatedSelectError.message);
  }

  if (!updatedWallets || updatedWallets.length === 0) {
    throw new Error("No se encontró la billetera actualizada");
  }

  // Comprobar que los valores han cambiado
  expect(updatedWallets[0].walletName).toBe(newWalletName);
  expect(updatedWallets[0].walletAmount).toBe(newWalletAmount);
  expect(updatedWallets[0].walletIcon).toBe(newWalletIcon);

  // Eliminar la billetera creada para limpiar
  await deleteWallet(walletID);
};

// Realiza la prueba con Jest
test("Update wallet test", testUpdateWallet);

/* ************************************************************************************************************************ */
//Test to update a transaction
const testUpdateTransaction = async () => {
  // Define the initial data to create a transaction
  const initialTransactionDate = "2023-10-01";
  const initialTransactionName = "Initial Transaction";
  const initialTransactionAmount = 500;
  const initialDestination = 2; // ID of the destination wallet
  const initialFrom = 1; // ID of the source wallet

  // Create an initial transaction to update later
  await createTransaction(
    initialTransactionDate,
    initialTransactionName,
    initialTransactionAmount,
    initialDestination,
    initialFrom
  );

  // Select the newly created transaction to get its ID
  const { data: transactions, error: selectError } = await supabase
    .from("Transaction")
    .select("*")
    .eq("transactionName", initialTransactionName)
    .eq("transactionAmount", initialTransactionAmount)
    .eq("destination", initialDestination)
    .eq("from", initialFrom);

  if (selectError) {
    throw new Error("Error selecting the transaction: " + selectError.message);
  }

  if (!transactions || transactions.length === 0) {
    throw new Error("The created transaction was not found");
  }

  const transactionID = transactions[0].transactionID;

  // Define the new values to update the transaction
  const newTransactionDate = "2023-11-01";
  const newTransactionName = "Updated Transaction test Jtest";
  const newTransactionAmount = 800;
  const newDestination = 3; // New ID of the destination wallet (example)
  const newFrom = 2; // New ID of the source wallet (example)

  // Call the update function
  await expect(
    updateTransaction(
      transactionID,
      newTransactionDate,
      newTransactionName,
      newTransactionAmount,
      newDestination,
      newFrom
    )
  ).resolves.not.toThrow(Error);

  // Verify that the transaction has been updated correctly
  const { data: updatedTransactions, error: updatedSelectError } = await supabase
    .from("Transaction")
    .select("*")
    .eq("transactionID", transactionID);

  if (updatedSelectError) {
    throw new Error("Error selecting the updated transaction: " + updatedSelectError.message);
  }

  if (!updatedTransactions || updatedTransactions.length === 0) {
    throw new Error("The updated transaction was not found");
  }

  // Check that the values have changed correctly
  expect(updatedTransactions[0].transactionDate).toBe(newTransactionDate);
  expect(updatedTransactions[0].transactionName).toBe(newTransactionName);
  expect(updatedTransactions[0].transactionAmount).toBe(newTransactionAmount);
  expect(updatedTransactions[0].destination).toBe(newDestination);
  expect(updatedTransactions[0].from).toBe(newFrom);

  // Delete the created transaction to clean up the database
  await deleteTransaction(transactionID);
};

// Run the test with Jest
test("Update transaction test", testUpdateTransaction);

