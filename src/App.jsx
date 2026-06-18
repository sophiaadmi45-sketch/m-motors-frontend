import { useVehicles } from './hooks/useVehicles';
import Header from './components/Header';
import Hero from './components/Hero';
import VehicleCard from './components/VehicleCard';
import Footer from './components/Footer';
import './App.css';

function App() {
  
  const {
    filteredVehicles,
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    sortOption,
    setSortOption
  } = useVehicles();

  return (
    <div className="app">
      <Header />

      <Hero 
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        typeFilter={typeFilter} setTypeFilter={setTypeFilter}
        sortOption={sortOption} setSortOption={setSortOption}
      />

      <main className="main-content">
        <p className="results-count">
          {filteredVehicles.length} véhicule{filteredVehicles.length > 1 ? 's' : ''} trouvé{filteredVehicles.length > 1 ? 's' : ''}
        </p>

        <div className="vehicles-grid">
          {filteredVehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;