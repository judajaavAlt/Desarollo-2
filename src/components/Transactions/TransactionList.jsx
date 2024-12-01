import CreateTransaction from "./crud/CreateTransaction";
import { useState } from "react";


const transactions = [
  { from: 'Principal', to: 'Efectivo', amount: '1.000.000', date: '22 de septiembre de 2024' },
  { from: 'Nequi', to: 'Principal', amount: '1.000.000', date: '22 de septiembre de 2024' },
  { from: 'Nequi', to: 'Daviplata', amount: '1.200.000', date: '22 de septiembre de 2024' },
  { from: 'Nequi', to: 'Tarjeta débito', amount: '20.000', date: '22 de septiembre de 2024' },
  { from: 'Daviplata', to: 'Tarjeta débito', amount: '220.000', date: '22 de septiembre de 2024' },
];



function TransactionList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="transaction-list">
      <button className="create-transaction-btn" onClick={openModal}>Crear Transferencia</button>
      <div className="transactions">
        {transactions.map((transaction, index) => (
          <div key={index} className="transaction-item">
            <p>{transaction.date}</p>
            <div className="transaction-details">
              <span>{transaction.from}</span>
              <span className="arrow">→</span>
              <span>{transaction.to}</span>
              <span>{transaction.amount} COL$</span>
            </div>
          </div>
        ))}
      </div>
      <CreateTransaction isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default TransactionList;
