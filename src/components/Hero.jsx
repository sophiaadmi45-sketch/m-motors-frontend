function Hero({ searchTerm, setSearchTerm, typeFilter, setTypeFilter, sortOption, setSortOption }) {
  return (
    <section className="hero">
      <h2>Trouvez votre prochain véhicule</h2>
      
      <div className="filters-container">
        <input
          type="text"
          placeholder="Rechercher par marque ou modèle..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="filter-select">
          <option value="">Tous les types</option>
          <option value="LLD">LLD</option>
          <option value="Achat">Achat</option>
        </select>

        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="filter-select">
          <option value="">Trier par...</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="km-asc">Km croissant</option>
          <option value="km-desc">Km décroissant</option>
        </select>
      </div>
    </section>
  );
}

export default Hero;