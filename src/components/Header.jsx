import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img
              src="/images/logo.svg"
              alt="M-Motors Logo"
              className="logo-img"
            />
          </Link>
          <div className="logo-text">
            <h1>M-Motors</h1>
            <p className="logo-subtitle">La spécialité de la mobilité automobile : Achat, Location & Service</p>
          </div>
        </div>
        <nav className="nav">


          <div className="nav-top-row">
            <Link to="/">Accueil</Link>


            {localStorage.getItem('isConnected') === 'true' ? (
              <>
                <span className="user-email">👤 {localStorage.getItem('userEmail')}</span>
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = '/login';
                  }}
                  className="btn-logout"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/register">Inscription</Link>
                <Link to="/login">Connexion</Link>
              </>
            )}
          </div>

          {/* LIGNE 2 : Navigation fonctionnelle (Uniquement si connecté) */}
          {localStorage.getItem('isConnected') === 'true' && (
            <div className="nav-links-row">
              <Link to="/dashboard">Mon Espace Client</Link>


              {localStorage.getItem('userRole') === 'DIRECTEUR' && (
                <div className="nav-dropdown-container">
                  <button
                    className="dropdown-trigger"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    Espace Pro {dropdownOpen ? '▴' : '▾'}
                  </button>

                  {dropdownOpen && (
                    <div className="nav-dropdown-menu">
                      <Link to="/back-office/dossiers" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        Gestion des Dossiers
                      </Link>
                      <Link to="/espace-pro/vehicules" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        Gestion du Parc Auto
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </nav>
      </div>
    </header>
  );
}

export default Header;