import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import VehicleDetail from './components/VehicleDetail.jsx'
import VehicleDossier from './components/VehicleDossier';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/vehicule/:id" element={<VehicleDetail />} />
        <Route path="/dossier/:id" element={<VehicleDossier />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
