function VehiclePrices({ type, prix }) {
  return (
    <div className="detail-prices">
      <div className="price-card">
        <span className="price-title">Prix d'Achat</span>
        <span className="price-amount">{prix.toLocaleString('fr-FR')} €</span>
      </div>
      <div className="price-card">
        <span className="price-title">Option LLD</span>
        <span className="price-amount-lld">
          {type === "LLD" ? `${Math.round(prix * 0.015)} € / mois` : "Sur demande"}
        </span>
      </div>
    </div>
  );
}

export default VehiclePrices;