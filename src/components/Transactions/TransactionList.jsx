import CreateTransaction from "./CreateTransaction/CreateTransaction";
import { useState, useEffect } from "react";
import { readTransaction } from "../../helpers/portTransaccion";
import { readWallet } from "../../helpers/portWallets";
import ReadTransaction from "./ReadTransaction/ReadTransaction";

// const transactions = [
//   { from: 'Principal', to: 'Efectivo', amount: '1.000.000', date: '22 de septiembre de 2024' },
//   { from: 'Nequi', to: 'Principal', amount: '1.000.000', date: '22 de septiembre de 2024' },
//   { from: 'Nequi', to: 'Daviplata', amount: '1.200.000', date: '22 de septiembre de 2024' },
//   { from: 'Nequi', to: 'Tarjeta débito', amount: '20.000', date: '22 de septiembre de 2024' },
//   { from: 'Daviplata', to: 'Tarjeta débito', amount: '220.000', date: '22 de septiembre de 2024' },
// ];

function TransactionList() {
  const [infoTransaction, setInfoTransaction] = useState(null);
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [isModalOpenRead, setIsModalOpenRead] = useState(false);
  const [dataWallet, setDataWallet] = useState([]);
  const [dataTranstation, setDataTranstation] = useState([]);

  useEffect(() => {
    const traer = async () => {
      try {
        const giveWallet = await readWallet(1);
        setDataWallet(giveWallet);

        const now = new Date();
        const mesActual = now.getMonth() + 1; // getMonth() devuelve un índice de 0 (enero) a 11 (diciembre), por eso se suma 1.
        const anioActual = now.getFullYear();

        const obtener = await readTransaction(1, mesActual, anioActual);
        setDataTranstation(obtener);
      } catch (e) {
        console.error("Error al cargar categorías:", e);
      }
    };
    traer();
  }, [isModalOpenCreate, isModalOpenCreate]);

  const openModalRead = (data) => {
    setIsModalOpenRead(true);
    setInfoTransaction(data);
  };

  const closeModalRead = () => {
    setIsModalOpenRead(false);
  };

  const openModalCreate = () => {
    setIsModalOpenCreate(true);
  };

  const closeModalCreate = () => {
    setIsModalOpenCreate(false);
  };

  return (
    <div className="transaction-list">
      <button className="create-transaction-btn" onClick={openModalCreate}>
        Crear Transferencia
      </button>
      <div className="transactions">
        {dataTranstation.map((transaction, index) => (
          <div
            key={index}
            onClick={() => openModalRead(transaction)}
            className="transaction-item"
          >
            <p>{transaction.transactionDate}</p>
            <div className="transaction-details">
              <span>
                {
                  dataWallet.find(
                    (wallet) => wallet.walletID === transaction.from
                  ).walletName
                }
              </span>
              <span className="arrow">→</span>
              <span>
                {
                  dataWallet.find(
                    (wallet) => wallet.walletID === transaction.destination
                  ).walletName
                }
              </span>
              <span>{transaction.transactionAmount} COL$</span>
            </div>
          </div>
        ))}
      </div>
      <CreateTransaction
        isOpen={isModalOpenCreate}
        onClose={closeModalCreate}
      />
      <ReadTransaction
        isOpen={isModalOpenRead}
        onClose={closeModalRead}
        infoTransaction={infoTransaction}
      />
    </div>
  );
}

export default TransactionList;
