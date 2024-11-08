

const wallets = [
  { name: 'Principal', amount: '1.000.000', currency: 'COL$', icon: '/path/to/icon1.png' },
  { name: 'Efectivo', amount: '1.000.000', currency: 'COL$', icon: '/path/to/icon2.png' },
  { name: 'Ahorro', amount: '500.000', currency: 'COL$', icon: '/path/to/icon3.png' },
  { name: 'Banco', amount: '100.000', currency: 'COL$', icon: '/path/to/icon4.png' },
  { name: 'Nequi', amount: '0', currency: 'COL$', icon: '/path/to/icon5.png' },
  { name: 'Tarjeta débito', amount: '220.000', currency: 'COL$', icon: '/path/to/icon6.png' },
  { name: 'Daviplata', amount: '1.000.000', currency: 'COL$', icon: '/path/to/icon7.png' },
];

function WalletList() {
  return (
    <div className="wallet-list">
       
      <div className="wallets">
        {wallets.map((wallet, index) => (
          <div key={index} className="wallet-item">
            <img src={wallet.icon} alt={wallet.name} className="wallet-icon" />
            <div className="wallet-details">
              <h3>{wallet.name}</h3>
              <p>{wallet.amount} {wallet.currency}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WalletList;
