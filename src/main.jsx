import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import VehicleDetail from './components/VehicleDetail.jsx'
import VehicleDossier from './components/VehicleDossier';
import Dashboard from './components/Dashboard.jsx'
import BackOfficeDossiers from './components/BackOfficeDossiers.jsx';
import BackOfficeVehicules from './components/BackOfficeVehicules'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/vehicule/:id" element={<VehicleDetail />} />
        <Route path="/dossier/:id" element={<VehicleDossier />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/back-office/dossiers" element={<BackOfficeDossiers />} />
        <Route path="/espace-pro/vehicules" element={<BackOfficeVehicules />} /> 
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)
