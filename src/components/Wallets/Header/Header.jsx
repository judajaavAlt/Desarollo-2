function Header() {
  return (
    <div className="header">
      <div className="total-display">
        <img src="src/assets/icons-grid/icon3.png" alt="Total" className="money-icon" />
        <div className="total-amount">
          <h1>Total: $3.820.000</h1>
        </div>
        <select className="currency-selector">
          <option>COP</option>
          <option>USD</option>
          <option>EUR</option>
        </select>
      </div>
    </div>
  );
}

export default Header;
