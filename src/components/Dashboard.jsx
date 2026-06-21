import React, { useState } from 'react';
import './Dashboard.css';

export default function Dashboard() {
   
    const [dossiers] = useState([
        { id: 101, typeContrat: 'LLD', statut: 'EN_COURS' },
        { id: 102, typeContrat: 'ACHAT', statut: 'VALIDE' },
        { id: 103, typeContrat: 'LLD', statut: 'REFUSE' }
    ]);

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
                                        <span className={`badge-status ${d.statut.toLowerCase()}`}>
                                            {d.statut.replace('_', ' ')}
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