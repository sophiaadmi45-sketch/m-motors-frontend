import { useState, useEffect } from 'react';
import { getBackendStatus } from './lib/api';   // Import du fichier central

function App() {
  const [backendStatus, setBackendStatus] = useState("Connexion au backend en cours...");

  useEffect(() => {
    getBackendStatus()
      .then(data => setBackendStatus(data))
      .catch(() => setBackendStatus("❌ Erreur de connexion"));
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h1>🚗 M-Motors</h1>
      
      <div style={{ 
        margin: "30px auto", 
        padding: "20px", 
        backgroundColor: "#f0f8ff", 
        borderRadius: "10px", 
        maxWidth: "600px" 
      }}>
        <strong>Statut Backend :</strong><br />
        {backendStatus}
      </div>

      <p>Si tu vois le message du backend ci-dessus, la connexion fonctionne ✅</p>
    </div>
  );
}

export default App;