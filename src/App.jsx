import { useVehicles } from './hooks/useVehicles';
import Hero from './components/Hero';
import VehicleCard from './components/VehicleCard';
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

      
    </div>
  );
}

export default App;