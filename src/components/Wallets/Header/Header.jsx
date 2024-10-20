
function Header() {
  return (
    <div className="header">
      <div className="total-display">
        <img src="/path/to/money-icon.png" alt="Total" className="money-icon" />
        <h1>Total: $3.820.000</h1>
        <select>
          <option>COP</option>
          <option>USD</option>
          <option>EUR</option>
        </select>
      </div>
    </div>
  );
}

export default Header;
