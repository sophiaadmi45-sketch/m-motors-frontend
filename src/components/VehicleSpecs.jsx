function VehicleSpecs({ vehicle }) {
  return (
    <div className="detail-specs">
      <h4>Caractéristiques techniques</h4>
      <ul>
        <li><strong>Marque :</strong> {vehicle.marque}</li>
        <li><strong>Modèle :</strong> {vehicle.modele}</li>
        <li><strong>Statut :</strong> {vehicle.disponible ? "Disponible" : "Réservé"}</li>
      </ul>
    </div>
  );
}

export default VehicleSpecs;