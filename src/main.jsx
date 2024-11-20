import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from './pages/Login';
import SingUp from './pages/SingUp';
import Home from './pages/Home';
import CategoryList from './components/Category/CategoryList';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<SingUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/category" element={<CategoryList />} />
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)