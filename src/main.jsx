import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from './pages/Login';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
