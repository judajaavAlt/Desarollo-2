//librerias
import { useState, useEffect } from "react";
import "./TransactionList.css";

//comoponentes
import CreateTransaction from "./CreateTransaction/CreateTransaction";
import ReadTransaction from "./ReadTransaction/ReadTransaction";

//contextos y helpers
import { useAuth } from "../../context/useAuth";
import { readTransaction } from "../../helpers/portTransaccion";
import { readWallet } from "../../helpers/portWallets";

function TransactionList() {
  const [infoTransaction, setInfoTransaction] = useState(null);
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [isModalOpenRead, setIsModalOpenRead] = useState(false);
  const [dataWallet, setDataWallet] = useState([]);
  const [dataTranstation, setDataTranstation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { userDocData } = useAuth();
  const usuario_id = userDocData["userID"];

  useEffect(() => {
    const traer = async () => {
      //setIsLoading(true); // Inicia la carga
      try {
        const giveWallet = await readWallet(usuario_id);
        setDataWallet(giveWallet);

        const now = new Date();
        const mesActual = now.getMonth() + 1;
        const anioActual = now.getFullYear();

        const obtener = await readTransaction(
          usuario_id,
          mesActual,
          anioActual,
        );
        setDataTranstation(obtener);
      } catch (e) {
        console.error("Error al cargar categorías:", e);
      } finally {
        setIsLoading(false); // Finaliza la carga
      }
    };
    traer();
  }, [isModalOpenRead, isModalOpenCreate, usuario_id]);

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

      {isLoading ? (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Cargando datos...</p>
        </div>
      ) : dataTranstation.length === 0 ? (
        <div className="no-transactions">
          <p>No hay transacciones disponibles.</p>
        </div>
      ) : (
        <div className="transactions">
          {dataTranstation.map((transaction) => {
            const uniqueKey = `${transaction.transactionDate}-${transaction.from}-${transaction.destination}`;
            return (
              <button
                key={uniqueKey}
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
                        (wallet) => wallet.walletID === transaction.from,
                      ).walletName
                    }
                  </span>
                  <span className="arrow">→</span>
                  <span>
                    {
                      dataWallet.find(
                        (wallet) => wallet.walletID === transaction.destination,
                      ).walletName
                    }
                  </span>
                  <span>{transaction.transactionAmount} COL$</span>
                </div>
              </button>
            );
          })}
        </div>
      )}

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
