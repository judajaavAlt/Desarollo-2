import CreateTransaction from "./CreateTransaction/CreateTransaction";
import { useState, useEffect } from "react";
import { readTransaction } from "../../helpers/portTransaccion";
import { readWallet } from "../../helpers/portWallets";
import ReadTransaction from "./ReadTransaction/ReadTransaction";

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
        const mesActual = now.getMonth() + 1;
        const anioActual = now.getFullYear();

        const obtener = await readTransaction(1, mesActual, anioActual);
        setDataTranstation(obtener);
      } catch (e) {
        console.error("Error al cargar categorías:", e);
      }
    };
    traer();
  }, [isModalOpenRead, isModalOpenCreate]);

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
        {dataTranstation.map((transaction) => {
          const uniqueKey = `${transaction.transactionDate}-${transaction.from}-${transaction.destination}`;
          return (
            <button
              key={uniqueKey} // Clave única generada
              tabIndex="0"
              onClick={() => openModalRead(transaction)}
              onKeyDown={(e) => {
                if (e.key === "Enter") openModalRead(transaction);
              }}
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
            </button>
          );
        })}
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
