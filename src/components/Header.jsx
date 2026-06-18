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
          <a href="#">Accueil</a>
          <a href="#">Véhicules</a>
          <a href="#">LLD</a>
          <a href="#">Achat</a>
          <a href="#">Contact</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;