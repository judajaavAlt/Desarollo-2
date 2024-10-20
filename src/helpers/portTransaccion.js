import  supabase  from "../apis/supa-base-api.js";
import dayjs from 'dayjs';


// Create a new transaction
// Input: 
//       Date tranctionDate: Date of the transaction
//       String transactionNate: Name of the transaction
//       Int transactionAmount: Transaction amount
//       Int destination: WalletID of the wallet which the money will be sent to 
//       Int userID: WalletID of the wallet from which the money will be withdrawn
// Returns: Nothing
async function createTransaction(ItransactionDate, ItransactionName, ItransactionAmount, Idestination, Ifrom) {
  const data = {
    transactionDate: ItransactionDate,
    transactionName: ItransactionName,
    transactionAmount: ItransactionAmount,
    destination: Idestination,  
    from: Ifrom                
  };

  const { error } = await supabase.from("Transaction")
                                  .insert(data);

  if (error != null) {
    throw new Error(error.message);
  }
}

// Read a transaction by date of the transaction
// Input: 
//       Int userID: User ID
//       Int month: Month of the transaction
//       Int year: Year of the transaction
// Returns: Nothing
async function readTransaction(userID,month,year) {
  
       const { data: wallets, error: walletError } = await supabase.from("Wallet")   
                                                                   .select("walletID")
                                                                   .eq("userID", userID);
       
       if (walletError) {
        throw new Error(walletError.message);
       }
       
      const walletIDs = wallets.map(wallet => wallet.walletID);
      const startDate = dayjs(`${year}-${month}`).startOf('month').format('YYYY-MM-DD'); 
      const endDate = dayjs(`${year}-${month}`).endOf('month').format('YYYY-MM-DD');   

      const { data: transactions, error: transactionError } = await supabase.from("Transaction")
                                                                            .select()
                                                                            .in("destination", walletIDs)
                                                                            .gte('transactionDate', startDate)  
                                                                            .lte('transactionDate', endDate); 
      console.log(transactions);                                                                      
      if (transactionError) {
        throw new Error(transactionError.message);
      }
      else {return transactions;}

}

// Input: 
//       Int transactionID: ID of the transaction to update
//       Date tranctionDate: New date of the transaction
//       String transactionDate: New name of the Transaction
//       Int transactionAmount: New transaction amount
//       Int destination: New walletID of the wallet which the money will be sent to 
//       Int userID: New walletID of the wallet from which the money will be withdrawn
// Returns: Nothing
async function updateTransaction(transactionID, ItransactionDate, ItransactionName, ItransactionAmount, Idestination, Ifrom) {
  const data = {
    transactionDate: ItransactionDate,
    transactionName: ItransactionName,
    transactionAmount: ItransactionAmount,
    destination: Idestination,
    from: Ifrom
  };

  const { error } = await supabase.from("Transaction")
                                  .update(data)
                                  .eq("transactionID", transactionID);

  if (error != null) {
    throw new Error(error.message);
  }
}

// Delate a wallet by ID
// Input: 
//       Int transactionID: ID of the transaction to delate
// Returns: Nothing
async function deleteTransaction(transactionID) {
  const { data, error } = await supabase.from("Transaction")
                                        .delete()
                                        .eq("transactionID", transactionID)
                                        .select();

  if (data == null) {
    throw new Error(error.message);
  } else {
    return data;
  }
}

export { createTransaction, readTransaction, updateTransaction, deleteTransaction };
