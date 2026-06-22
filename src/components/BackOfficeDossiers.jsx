import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import './BackOfficeDossiers.css';

export default function BackOfficeDossiers() {
    const [dossiers, setDossiers] = useState([]);

    const chargerDossiers = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/dossiers`);
            if (res.ok) {
                const data = await res.json();
                setDossiers(data);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des dossiers", error);
        }
    };

    useEffect(() => {
        chargerDossiers();
    }, []);

    const [filtreStatut, setFiltreStatut] = useState('TOUS');
    const [commentaireSaisi, setCommentaireSaisi] = useState('');
    const [dossierSelectionne, setDossierSelectionne] = useState(null);
    const [actionType, setActionType] = useState(''); // 'VALIDE' ou 'REFUSE'

    const preparerAction = (id, type) => {
        setDossierSelectionne(id);
        setActionType(type);
        setCommentaireSaisi(''); 
    };

    const soumettreDecision = async (e) => {
        e.preventDefault();
        if (!commentaireSaisi.trim()) {
            alert("Le commentaire est obligatoire pour traiter ce dossier !");
            return;
        }

        try {
            const res = await fetch(`${API_BASE_URL}/api/dossiers/${dossierSelectionne}/statut`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    statut: actionType,
                    commentaireHistorique: commentaireSaisi
                })
            });

            if (res.ok) {
                await chargerDossiers();
                setDossierSelectionne(null);
                setActionType('');
                setCommentaireSaisi('');
            } else {
                alert("Erreur lors de l'enregistrement de la décision.");
            }
        } catch (error) {
            alert("Impossible de joindre le serveur pour enregistrer la décision.");
        }
    };

    const dossiersFiltres = dossiers.filter(d => {
        if (filtreStatut === 'TOUS') return true;
        return d.statut === filtreStatut;
    });

    return (
        <div className="bo-container">
            <h1 className="bo-title">Espace Back-Office — Gestion des Dossiers Clients</h1>
            
            <div className="bo-filters-bar">
                <label className="filter-label">Filtrer par statut :</label>
                <select 
                    value={filtreStatut} 
                    onChange={e => setFiltreStatut(e.target.value)}
                    className="bo-select-filter"
                >
                    <option value="TOUS">Tous les dossiers</option>
                    <option value="EN_COURS">En cours</option>
                    <option value="VALIDE">Validés</option>
                    <option value="REFUSE">Refusés</option>
                </select>
            </div>

            {dossierSelectionne && (
                <div className="bo-decision-box">
                    <h3>Traitement du dossier #DOS-{dossierSelectionne} ({actionType === 'VALIDE' ? 'Validation' : 'Refus'})</h3>
                    <form onSubmit={soumettreDecision}>
                        <div className="form-group">
                            <label>Pourquoi modifiez-vous le statut ? (Commentaire obligatoire) :</label>
                            <textarea 
                                required
                                value={commentaireSaisi}
                                onChange={e => setCommentaireSaisi(e.target.value)}
                                placeholder="Saisissez un motif précis..."
                                className="bo-textarea"
                            />
                        </div>
                        <div className="bo-decision-actions">
                            <button type="submit" className={`btn-confirm ${actionType === 'VALIDE' ? 'btn-validate' : 'btn-reject'}`}>
                                Confirmer la décision
                            </button>
                            <button type="button" className="btn-cancel" onClick={() => setDossierSelectionne(null)}>
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="table-responsive">
                <table className="bo-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Client</th>
                            <th>Option</th>
                            <th>Statut</th>
                            <th>Documents justificatifs</th> 
                            <th>Commentaire Historique</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dossiersFiltres.map(d => (
                            <tr key={d.id}>
                                <td className="text-bold">#DOS-{d.id}</td>
                                <td>
                                    <div>{d.clientName}</div>
                                    <div className="text-muted">{d.clientEmail}</div>
                                </td>
                                <td>{d.typeContrat}</td>
                                <td>
                                    <span className={`badge-status ${d.statut.toLowerCase()}`}>
                                        {d.statut.replace('_', ' ')}
                                    </span>
                                </td>
                                <td>
                                    {d.pieceIdentiteName ? (
                                        <a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank" rel="noreferrer" className="bo-link">
                                            📄 {d.pieceIdentiteName}
                                        </a>
                                    ) : <span className="text-muted">Aucun fichier</span>}
                                    <br />
                                    {d.justificatifDomicileName ? (
                                        <a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank" rel="noreferrer" className="bo-link">
                                            🏠 {d.justificatifDomicileName}
                                        </a>
                                    ) : <span className="text-muted">Aucun fichier</span>}
                                </td>
                                <td className="text-comment">{d.commentaireHistorique || <span className="no-comment">—</span>}</td>
                                <td>
                                    <button className="btn-action btn-sm-validate" onClick={() => preparerAction(d.id, 'VALIDE')}>
                                        Valider
                                    </button>
                                    <button className="btn-action btn-sm-reject" onClick={() => preparerAction(d.id, 'REFUSE')}>
                                        Refuser
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}