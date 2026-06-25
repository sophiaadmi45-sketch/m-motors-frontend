import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import './Dashboard.css';

export default function Dashboard() {

    const location = useLocation();
    const [dossiers, setDossiers] = useState([]);
    const clientEmail = location.state?.email || localStorage.getItem('userEmail') || "";

    useEffect(() => {
        if (clientEmail) {
            fetch(`${API_BASE_URL}/api/dossiers/suivi?email=${clientEmail}`)
                .then(res => {
                    if (res.ok) return res.json();
                    return [];
                })
                .then(data => setDossiers(data))
                .catch(err => console.error("Erreur de récupération des dossiers", err));
        }
    }, [clientEmail]);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1 className="dashboard-title">Mon Espace Client</h1>
                <p className="dashboard-subtitle">Suivi de l'avancement de vos dossiers en temps réel</p>
            </header>

            <main className="dashboard-content">
                <div className="table-responsive">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Référence</th>
                                <th>Type de Contrat</th>
                                <th>Statut de la demande</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dossiers.map(d => (
                                <tr key={d.id}>
                                    <td className="text-bold">#DOS-{d.id}</td>
                                    <td>{d.typeContrat}</td>
                                    <td>
                                        <span className={`badge-status ${d.statut ? d.statut.toLowerCase() : 'en_cours'}`}>
                                            {d.statut ? d.statut.replace('_', ' ') : 'En cours'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}