import { Link } from 'react-router-dom';

function Header() {
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
          <Link to="/dashboard">Mon Espace Client</Link>
          <Link to="/back-office/dossiers" className="nav-pro-link">Espace Pro</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;