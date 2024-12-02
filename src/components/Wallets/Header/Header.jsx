import { useState, useEffect } from "react";
import { readWallet } from "../../../helpers/portWallets";
import { useAuth } from "../../../context/useAuth";

function Header() {
  const { userDocData } = useAuth();
  const user_id = userDocData.userID;
  const [currency, setCurrency] = useState("COP");
  const [total, setTotal] = useState(0.0); // Total en COP

  useEffect(() => {
    const traer = async () => {
      try {
        const obtener = await readWallet(user_id);
        console.log(obtener);
        // Calcular la suma de todas las billeteras
        const totalAmount = obtener.reduce(
          (sum, wallet) => sum + wallet.walletAmount,
          0,
        );
        console.log("Total de todas las billeteras:", totalAmount);
        setTotal(totalAmount);
      } catch (e) {
        console.error("Error al cargar categorías:", e);
      }
    };
    traer();
  }, [user_id]);

  // Tasas de cambio (puedes obtenerlas dinámicamente si es necesario)
  const exchangeRates = {
    COP: 1, // Base en COP
    USD: 0.00022, // Ejemplo: 1 COP = 0.00025 USD
    EUR: 0.00021, // Ejemplo: 1 COP = 0.00023 EUR
  };

  const handleCurrencyChange = (event) => {
    const selectedCurrency = event.target.value;
    setCurrency(selectedCurrency);

    const convertedTotal = (3820000 * exchangeRates[selectedCurrency]).toFixed(
      2,
    );
    setTotal(convertedTotal);
  };

  return (
    <div className="header">
      <div className="total-display">
        <img
          src="src/assets/icons-grid/icon3.png"
          alt="Total"
          className="money-icon"
        />
        <div className="total-amount">
          <h1>
            Total: {currency} {total}
          </h1>
        </div>
        <select
          className="currency-selector"
          value={currency}
          onChange={handleCurrencyChange}
        >
          <option value="COP">COP</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
    </div>
  );
}

export default Header;
