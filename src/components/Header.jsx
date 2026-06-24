import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <header className="header">
      <div className="header-container">
       <div className="logo">  
          <img 
            src="/images/logo.svg" 
            alt="M-Motors Logo" 
            className="logo-img" 
          />
        <div className="logo-text">
            <h1>M-Motors</h1>
            <p className="logo-subtitle">La spécialité de la mobilité automobile : Achat, Location & Service</p>
          </div> 
        </div>
        <nav className="nav">
          <Link to="/">Accueil</Link>
          <Link to="/register">Inscription</Link>
          <Link to="/login">Connexion</Link>
          <Link to="/dashboard">Mon Espace Client</Link>
          <div className="nav-dropdown-container">
    <button 
      className="nav-pro-link dropdown-trigger"
      onClick={() => setDropdownOpen(!dropdownOpen)} // Ouvre et ferme au clic
    >
      Espace Pro {dropdownOpen ? '▴' : '▾'}
    </button>

    {dropdownOpen && (
      <div className="nav-dropdown-menu">
        <Link 
          to="/back-office/dossiers" 
          className="dropdown-item" 
          onClick={() => setDropdownOpen(false)} // Ferme le menu après le clic
        >
          📁 Gestion des Dossiers
        </Link>
        <Link 
          to="/espace-pro/vehicules" 
          className="dropdown-item" 
          onClick={() => setDropdownOpen(false)} // Ferme le menu après le clic
        >
          🚗 Gestion du Parc Auto
        </Link>
      </div>
    )}
  </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;