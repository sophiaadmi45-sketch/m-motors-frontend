import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

function VehicleCard({ vehicle }) {
  let cheminImage = vehicle.imageUrl;
  
  if (vehicle.imageUrl && vehicle.imageUrl.startsWith('/images')) {
    
    cheminImage = `${API_BASE_URL}${vehicle.imageUrl}`;
  }
  return (
    <div className="vehicle-card">
      <img
        src={cheminImage} 
        alt={vehicle.modele}
        className="vehicle-image"
        onError={(e) => {
          
          if (e.target.src.startsWith(API_BASE_URL)) {
            e.target.src = vehicle.imageUrl;
          } else {
            e.target.style.display = 'none';
          }
        }}
      />
      <div className="vehicle-info">
        <h3>{vehicle.marque} {vehicle.modele}</h3>
        <p className="price">{vehicle.prix.toLocaleString('fr-FR')} €</p>
        <p><strong>{vehicle.kilometrage.toLocaleString('fr-FR')} km</strong></p>
        <span className="type">{vehicle.type}</span>
        <p className="description">{vehicle.description}</p>
        
        {vehicle.disponible && (
          <Link to={`/vehicule/${vehicle.id}`} className="btn-reserve">
           Voir les détails
          </Link>
        )}
      </div>
    </div>
  );
}

export default VehicleCard;