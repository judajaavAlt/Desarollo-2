import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import CategoryList from './components/Category/CategoryList';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CategoryList></CategoryList>
  </StrictMode>
);
