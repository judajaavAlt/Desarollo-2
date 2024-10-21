import supabase from "../src/apis/supa-base-api";
import dayjs from "dayjs";
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
