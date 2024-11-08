import  React, { useState } from 'react';
import './CreateMovement.css'; 

const CreateMovement = ({ onClose }) => {
   // Estado para la categoría seleccionada
   const [amount, setAmount] = useState('');
   const [date, setDate] = useState('');
   const [wallet, setWallet] = useState('');
   const [description, setDescription] = useState('');
   const [selectedCategory, setSelectedCategory] = useState('');

   // Función para manejar la selección de categoría
   const handleCategoryClick = (category) => {
     setSelectedCategory(category);
   };

   const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!amount || !date || !wallet || !selectedCategory) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    // Crear el objeto de datos para enviar al backend
    const movementData = {
      amount,
      date,
      wallet,
      description,
      category: selectedCategory,
    };

    try {
      // Enviar los datos al backend usando fetch
      const response = await fetch('URL_DE_TU_BACKEND/api/movements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movementData),
      });

      if (response.ok) {
        alert('Movimiento creado exitosamente.');
        onClose(); // Cierra el formulario después de crear el movimiento
      } else {
        alert('Hubo un problema al crear el movimiento.');
      }
    } catch (error) {
      console.error('Error al crear el movimiento:', error);
      alert('Hubo un problema al conectar con el servidor.');
    }
  };

  return (
    <div className='create-movement'>
      <h2 className='create-movement-title'>CREACIÓN DEL MOVIMIENTO:</h2>
      <form onSubmit={handleSubmit}>
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
          <input className='input-field' 
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
            onChange={(e) => setWallet(e.target.value)}
          >
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
            placeholder="Añada una descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>Categoría:</label>
          <div className='categories'>
            {['Arriendo','Comida','Transporte','Internet','Carro','Seguro'].map((category)=> (
              <button
              key={category}
              type='button'
              className={`category ${selectedCategory === category ? 'selected' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button> 
            ))}
          </div>
        </div>
        <div className='actions'>
          <button className='cancel-btn' onClick={onClose}>Cancelar</button>
          <button className='save-btn' type="submit">Crear</button>
      </div>
      </form>
    </div>
  );
};

export default CreateMovement;