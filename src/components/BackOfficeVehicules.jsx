import React, { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from '../config';
import './BackOfficeVehicules.css';

export default function BackOfficeVehicules() {
    const [vehicules, setVehicules] = useState([]);
    const [message, setMessage] = useState('');
    const [modeEdition, setModeEdition] = useState(false);
    const [idVehiculeEnCours, setIdVehiculeEnCours] = useState(null);
    const fileInputRef = useRef(null);

    const initialFormState = {
        marque: '',
        modele: '',
        type: 'ACHAT', 
        prix: '',
        kilometrage: '',
        description: '',
        imageUrl: '',
        disponible: true
    };

    const [form, setForm] = useState(initialFormState);

    const chargerVehicules = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/vehicles`);
            if (res.ok) {
                const data = await res.json();
                setVehicules(data);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération du catalogue", error);
        }
    };

    useEffect(() => {
        chargerVehicules();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            if (modeEdition) {
               
                const res = await fetch(`${API_BASE_URL}/vehicles/${idVehiculeEnCours}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...form,
                        prix: parseFloat(form.prix),
                        kilometrage: parseInt(form.kilometrage, 10)
                    })
                });

                if (res.ok) {
                    setMessage('✅ Véhicule modifié avec succès en base de données !');
                    annulerEdition();
                    chargerVehicules();
                } else {
                    setMessage('❌ Erreur lors de la modification du véhicule.');
                }
            } else {
                
                const formData = new FormData();
                formData.append('marque', form.marque);
                formData.append('modele', form.modele);
                formData.append('type', form.type);
                formData.append('prix', form.prix);
                formData.append('kilometrage', form.kilometrage);
                formData.append('description', form.description);
                formData.append('disponible', form.disponible ? "true" : "false");
                
                
                const fileInput = fileInputRef.current;
                if (fileInput && fileInput.files[0]) {
                    formData.append('imageFile', fileInput.files[0]);
                } else {
                    alert("La photo du véhicule est obligatoire pour l'ajouter au catalogue !");
                    return;
                }

                const res = await fetch(`${API_BASE_URL}/vehicles`, {
                    method: 'POST',
                    body: formData 
                });

                if (res.ok) {
                    setMessage('✅ Véhicule ajouté avec succès avec sa photo optimisée en WebP !');                                       
                    annulerEdition();
                    chargerVehicules();
                    if (fileInput) fileInput.value = '';         
                    e.target.reset();
                } else {
                    
                    setMessage('❌ Erreur lors de l\'ajout du véhicule au catalogue.');
                }
            }
        } catch (error) {
            setMessage('❌ Impossible de joindre le serveur.');
        }
    };

    const preparerModification = (v) => {
        setModeEdition(true);
        setIdVehiculeEnCours(v.id);
        setForm({
            marque: v.marque,
            modele: v.modele,
            type: v.type || 'ACHAT',
            prix: v.prix,
            kilometrage: v.kilometrage,
            description: v.description || '',
            imageUrl: v.imageUrl || '',
            disponible: v.disponible !== false
        });
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    const annulerEdition = () => {
        setModeEdition(false);
        setIdVehiculeEnCours(null);
        setForm(initialFormState);
    };

    return (
        <div className="bo-container">
            <h1 className="bo-title">Espace Back-Office — Gestion du Parc Automobile</h1>
            
            {message && <div className="bo-alert">{message}</div>}

            
            <h2 className="bo-section-subtitle">🚗 Liste des Véhicules en Catalogue</h2>
            <div className="table-responsive bo-table-wrapper">
                <table className="bo-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Véhicule</th>
                            <th>Type actuel</th>
                            <th>Prix</th>
                            <th>Kilométrage</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicules.map(v => (
                            <tr key={v.id}>
                                <td className="text-bold">#CAR-{v.id}</td>
                                <td>
                                    <div className="text-bold">{v.marque}</div>
                                    <div className="text-muted">{v.modele}</div>
                                </td>
                                <td>
                                    <span className={`type-tag ${v.type ? v.type.toLowerCase() : 'achat'}`}>
                                        {v.type === 'LLD' ? 'Location LLD' : 'Achat Direct'}
                                    </span>
                                </td>
                                <td className="text-bold">{v.prix ? v.prix.toLocaleString() : 0} €</td>
                                <td>{v.kilometrage ? v.kilometrage.toLocaleString() : 0} km</td>
                                <td>
                                    <span className={`badge-status ${v.disponible ? 'valide' : 'refuse'}`}>
                                        {v.disponible ? 'Disponible' : 'Indisponible'}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn-action btn-sm-validate" onClick={() => preparerModification(v)}>
                                        Modifier
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {vehicules.length === 0 && (
                            <tr>
                                <td colSpan="7" className="bo-empty-table">Aucun véhicule trouvé.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            
            <h2 className="bo-section-subtitle bo-form-title-spacing">
                {modeEdition ? `📝 Modifier le véhicule #CAR-${idVehiculeEnCours}` : '➕ Ajouter un Nouveau Véhicule'}
            </h2>

            <form onSubmit={handleSubmit} className="bo-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>Marque :</label>
                        <input type="text" name="marque" value={form.marque} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Modèle :</label>
                        <input type="text" name="modele" value={form.modele} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Type d'offre :</label>
                        <select name="type" value={form.type} onChange={handleChange} className="bo-select">
                            <option value="ACHAT">Achat Classique</option>
                            <option value="LLD">Location Longue Durée (LLD)</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Prix (€) :</label>
                        <input type="number" name="prix" value={form.prix} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Kilométrage :</label>
                        <input type="number" name="kilometrage" value={form.kilometrage} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Sélectionner la photo du véhicule :</label>
                        <input 
                            type="file" 
                            ref={fileInputRef}
                            accept="image/png, image/jpeg, image/jpg, image/webp" 
                            required={!modeEdition} 
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Description du véhicule :</label>
                    <textarea name="description" value={form.description} onChange={handleChange} rows="4" required></textarea>
                </div>

                <div className="form-group checkbox-group">
                    <label>
                        <input type="checkbox" name="disponible" checked={form.disponible} onChange={handleChange} />
                        Véhicule disponible immédiatement à la vente/location
                    </label>
                </div>

                <div className="bo-form-actions">
                    <button type="submit" className="btn-confirm btn-validate">
                        {modeEdition ? 'Enregistrer les modifications' : 'Enregistrer le véhicule'}
                    </button>
                    {modeEdition && (
                        <button type="button" className="btn-cancel" onClick={annulerEdition}>
                            Annuler
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}