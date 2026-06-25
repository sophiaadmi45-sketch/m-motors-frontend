import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

function VehicleCard({ vehicle }) {

  const baseApiUrl = API_BASE_URL ? API_BASE_URL.replace(/\/$/, '') : '';

  const estUneImageDuCloud = vehicle.imageUrl && vehicle.imageUrl.includes('_');

  const cheminImage = estUneImageDuCloud
    ? `${baseApiUrl}${vehicle.imageUrl}`
    : vehicle.imageUrl;

  return (
    <div className="vehicle-card">
      <img
        src={cheminImage}
        alt={vehicle.modele}
        className="vehicle-image"
        onError={(e) => {
          console.error(`[DÉBUG IMAGE] Échec de chargement pour le véhicule ${vehicle.marque} ${vehicle.modele}. URL tentée :`, e.target.src);

          if (baseApiUrl && e.target.src.startsWith(baseApiUrl)) {
            e.target.style.display = 'none';
          } 

          else {
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