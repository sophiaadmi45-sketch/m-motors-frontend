import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import VehicleSpecs from './VehicleSpecs';
import VehiclePrices from './VehiclePrices';
import './VehicleDetail.css'; 

function VehicleDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  const baseApiUrl = API_BASE_URL ? API_BASE_URL.replace(/\/$/, '') : '';

  useEffect(() => {
    fetch(`${API_BASE_URL}/vehicles/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Erreur serveur');
        return res.json();
      })
      .then(data => { setVehicle(data); setLoading(false); })
      .catch(() => setLoading(false)); 
  }, [id]);

  if (loading) return <div className="app"><main className="main-content"><p className="detail-status">Chargement...</p></main></div>;
  
  
  if (!vehicle) return <div className="app"><main className="main-content"><p className="detail-status">Véhicule introuvable ou indisponible (Erreur BDD)</p><Link to="/" className="back-link"> Retour</Link></main></div>;

  const estUneImageDuCloud = vehicle.imageUrl && vehicle.imageUrl.includes('_');

  const cheminImage = estUneImageDuCloud
    ? `${baseApiUrl}${vehicle.imageUrl}`
    : vehicle.imageUrl;

  return (
    <div className="app">
      <main className="main-content">
        <Link to="/" className="back-link"> Retour</Link>
        <div className="detail-container">
          <div className="detail-media">
            <img 
              src={cheminImage} 
              alt={vehicle.modele} 
              className="detail-image" 
              onError={(e) => {
               
                console.error(`[DÉBUG IMAGE DÉTAIL] Échec pour ${vehicle.marque} ${vehicle.modele}. URL tentée :`, e.target.src);

                if (baseApiUrl && e.target.src.startsWith(baseApiUrl)) {
                  e.target.style.display = 'none';
                } else if (estUneImageDuCloud && baseApiUrl) {
                  console.log(`[RATTRAPAGE DÉTAIL] Redirection forcée vers le Back-end.`);
                  e.target.src = `${baseApiUrl}${vehicle.imageUrl}`;
                } else {
                  e.target.style.display = 'none';
                }
              }}
            />
          </div>
          <div className="detail-info">
            <span className="detail-badge">{vehicle.type}</span>
            <h2>{vehicle.marque} {vehicle.modele}</h2>
            <p className="detail-km"><strong>{vehicle.kilometrage?.toLocaleString('fr-FR')} km</strong></p>
            
            <VehicleSpecs vehicle={vehicle} />
            <p className="detail-description-text">{vehicle.description}</p>
            <VehiclePrices type={vehicle.type} prix={vehicle.prix} />

            <button onClick={() => navigate(`/dossier/${id}`)} className="btn-dossier">
              Je dépose mon dossier
            </button>
          </div>
        </div>
      </main>
     
    </div>
  );
}

export default VehicleDetail;