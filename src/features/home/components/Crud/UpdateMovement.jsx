/*
import { useState } from 'react';
import './UpdateMovement.css';

const UpdateMovement = ({ movement, onClose }) => {
  const [amount, setAmount] = useState(movement.amount);
  const [date, setDate] = useState(movement.date);
  const [wallet, setWallet] = useState(movement.wallet);
  const [description, setDescription] = useState(movement.description);
  const [selectedCategory, setSelectedCategory] = useState(movement.category);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!amount || !date || !wallet || !selectedCategory) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    const updatedMovement = {
      amount,
      date,
      wallet,
      description,
      category: selectedCategory,
    };


    {//Conectar con el Backend Update}
    try {
      const response = await fetch(`URL_DE_TU_BACKEND/api/movements/${movement.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMovement),
      });

      if (response.ok) {
        alert('Movimiento actualizado exitosamente.');
        onClose();
      } else {
        alert('Error al actualizar el movimiento.');
      }
    } catch (error) {
      console.error('Error al actualizar el movimiento:', error);
      alert('Hubo un problema al conectar con el servidor.');
    }
  };

  return (
    <div className="update-movement">
      <h2 className='update-movement-title'>Editar Movimiento</h2>
      <form onSubmit={handleUpdate}>
        <div className='form-group'>
          <label>Monto:</label>
          <input
            className='input-field'
            type="number"
            placeholder="Ingrese el monto"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>Fecha:</label>
          <input
            className='input-field'
            type="date"
            placeholder="Ingrese la fecha"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>Billetera:</label>
          <select className='input-field'
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}>
            <option value="">Seleccione una billetera</option>
            <option value="wallet1">Billetera 1</option>
            <option value="wallet2">Billetera 2</option>
            <option value="wallet3">Billetera 3</option>
          </select>
        </div>
        <div className='form-group'>
          <label>Descripción:</label>
          <textarea
            className='textarea-field'
            placeholder='Añada una descripción'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Categoría</label>
          <div className='categories'>
            {['Alimento', 'Comida','Transporte','Internet','Carro','Seguro'].map((category) => (
              <button
                key={category}
                type="button"
                className={`category ${selectedCategory === category ? 'selected' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="actions">
          <button className="save-btn" type="submit">Guardar</button>
          <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMovement;
*/