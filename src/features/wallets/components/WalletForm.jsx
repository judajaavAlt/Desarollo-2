// src/components/WalletForm.jsx
import { useState } from 'react';

export default function WalletForm() {
  const [walletName, setWalletName] = useState('');
  const [amount, setAmount] = useState(0);
  const [color, setColor] = useState('#000000');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para crear billetera
    console.log({ walletName, amount, color });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Nombre de la billetera" 
        value={walletName} 
        onChange={(e) => setWalletName(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Cantidad" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
      />
      <input 
        type="color" 
        value={color} 
        onChange={(e) => setColor(e.target.value)} 
      />
      <button type="submit">Crear Billetera</button>
    </form>
  );
}
