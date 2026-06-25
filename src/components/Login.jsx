import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config'; 
import './Login.css';

function Login() {
  const [accountType, setAccountType] = useState('client');
  const [formData, setFormData] = useState({
    email: '',
    motDePasse: ''
  });
  
  const [message, setMessage] = useState({ text: '', isError: false });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', isError: false });

    const endpoint = `${API_BASE_URL}/api/auth/connexion`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          motDePasse: formData.motDePasse
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (accountType === 'pro' && data.role !== 'DIRECTEUR') {
          setMessage({ 
            text: 'Accès refusé. Cet espace est réservé au personnel autorisé.', 
            isError: true 
          });
          return;
        }

        if (accountType === 'client' && data.role === 'DIRECTEUR') {
          setMessage({ 
            text: 'Veuillez utiliser l’onglet Espace Professionnel pour vous connecter.', 
            isError: true 
          });
          return;
        }

        setMessage({ text: 'Connexion réussie ! Redirection...', isError: false });
        
        localStorage.setItem('isConnected', 'true');
        localStorage.setItem('userEmail', data.email || formData.email);
        localStorage.setItem('userRole', data.role); 

        setTimeout(() => {
          window.location.href = data.role === 'DIRECTEUR' ? '/back-office/dossiers' : '/dashboard'; 
        }, 1500);
      } else {
        setMessage({ 
          text: data.message || 'Identifiants incorrects. Veuillez réessayer.', 
          isError: true 
        });
      }
    } catch (error) {
      setMessage({ 
        text: 'Erreur de connexion au serveur. Veuillez réessayer plus tard.', 
        isError: true 
      });
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert("Fonctionnalité 'Mot de passe oublié' : Un e-mail de récupération fictif a été envoyé.");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        <div className="login-tabs">
          <button 
            type="button"
            className={`tab-btn ${accountType === 'client' ? 'active-tab' : ''}`}
            onClick={() => setAccountType('client')}
          >
           Espace Client
          </button>
          <button 
            type="button"
            className={`tab-btn ${accountType === 'pro' ? 'active-tab' : ''}`}
            onClick={() => setAccountType('pro')}
          >
            Espace Professionnel
          </button>
        </div>

        <h2>{accountType === 'pro' ? 'Connexion Personnel M-Motors' : 'Connexion Client'}</h2>
        
        {message.text && (
          <div className={`message-box ${message.isError ? 'error-box' : 'success-box'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Adresse E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="exemple@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="motDePasse">Mot de passe</label>
            <input
              type="password"
              id="motDePasse"
              name="motDePasse"
              value={formData.motDePasse}
              onChange={handleChange}
              required
              placeholder="Votre mot de passe"
            />
          </div>

          <div className="forgot-password-container">
            <a href="#" onClick={handleForgotPassword} className="forgot-password-link">
              Mot de passe oublié ?
            </a>
          </div>

          <button type="submit" className="btn-submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
}

export default Login;