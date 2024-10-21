import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/layout'; // Importa el layout
import WalletsPage from './pages/WalletsPage/walletPage'; // Importa la página WalletsPage
import HomePage from './pages/HomePage/homePage';
// Otra página de ejemplo

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta que usa el layout */}
        <Route path="/" element={<Layout />}>
          <Route path="wallets" element={<WalletsPage />} />
          <Route path="home" element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
