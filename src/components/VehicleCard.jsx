function VehicleCard({ vehicle }) {
  return (
    <div className="vehicle-card">
      <img
        src={vehicle.imageUrl}
        alt={vehicle.modele}
        className="vehicle-image"
        onError={(e) => e.target.style.display = 'none'}
      />
      <div className="vehicle-info">
        <h3>{vehicle.marque} {vehicle.modele}</h3>
        <p className="price">{vehicle.prix.toLocaleString('fr-FR')} €</p>
        <p><strong>{vehicle.kilometrage.toLocaleString('fr-FR')} km</strong></p>
        <span className="type">{vehicle.type}</span>
        <p className="description">{vehicle.description}</p>
        
        {vehicle.disponible && (
          <button className="btn-reserve">Je suis intéressé</button>
        )}
      </div>
    </div>
  );
}

export default VehicleCard;