import React, { useState } from 'react';
import './UpdateMovement.css';

const UpdateMovement = ({ movement, onClose }) => {
  const [description, setDescription] = useState(movement.description);
  const [amount, setAmount] = useState(movement.amount);
  const [date, setDate] = useState(movement.date);
  const [wallet, setWallet] = useState(movement.wallet);

  const handleUpdate = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de actualización del movimiento.
    console.log({ description, amount, date, wallet });
  };

  return (
    <div className="update-movement">
      <h2>Editar Movimiento</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <input
            type="text"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Monto"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <select value={wallet} onChange={(e) => setWallet(e.target.value)}>
            <option value="">Seleccionar billetera</option>
            <option value="efectivo">Efectivo</option>
            <option value="banco">Banco</option>
          </select>
        </div>
        <div className="categories">
          <button type="button" className="category">Alimento</button>
          <button type="button" className="category">Transporte</button>
          <button type="button" className="category">Entretenimiento</button>
        </div>
        <div className="actions">
          <button type="submit" className="save-btn">Guardar</button>
          <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMovement;
