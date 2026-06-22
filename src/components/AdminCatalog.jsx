import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import './AdminCatalog.css'; 

export default function AdminCatalog() {
    const [vehicles, setVehicles] = useState([]);
    const [formData, setFormData] = useState({
        marque: '', modele: '', type: 'Achat', prix: '', kilometrage: '', description: '', imageUrl: ''
    });
    const [editingId, setEditingId] = useState(null);

    const fetchVehicles = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/vehicles`);
            const data = await res.json();
            setVehicles(data);
        } catch (err) {
            console.error("Erreur chargement catalogue:", err);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editingId ? `${API_BASE_URL}/vehicles/${editingId}` : `${API_BASE_URL}/vehicles`;
        const method = editingId ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setFormData({ marque: '', modele: '', type: 'Achat', prix: '', kilometrage: '', description: '', imageUrl: '' });
                setEditingId(null);
                fetchVehicles(); 
            }
        } catch (err) {
            console.error("Erreur lors de l'enregistrement:", err);
        }
    };

    const handleToggleType = async (vehicle) => {
        const newType = vehicle.type === 'Achat' ? 'LLD' : 'Achat';
        try {
            const res = await fetch(`${API_BASE_URL}/vehicles/${vehicle.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...vehicle, type: newType })
            });
            if (res.ok) {
                fetchVehicles();
            }
        } catch (err) {
            console.error("Erreur lors de la bascule de type:", err);
        }
    };

    return (
        <div className="admin-catalog-container">
            <h2>Back-Office : Gestion du Catalogue (US-007)</h2>
            
            <form onSubmit={handleSubmit} className="admin-form">
                <h3>{editingId ? "Modifier le véhicule" : "Ajouter un nouveau véhicule"}</h3>
                
                <div className="form-group">
                    <input className="form-input" name="marque" placeholder="Marque" value={formData.marque} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <input className="form-input" name="modele" placeholder="Modèle" value={formData.modele} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <select className="form-select" name="type" value={formData.type} onChange={handleChange}>
                        <option value="Achat">Achat</option>
                        <option value="LLD">LLD (Location Longue Durée)</option>
                    </select>
                </div>
                <div className="form-group">
                    <input className="form-input" name="prix" type="number" placeholder="Prix (€)" value={formData.prix} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <input className="form-input" name="kilometrage" type="number" placeholder="Kilométrage" value={formData.kilometrage} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <input className="form-input" name="imageUrl" placeholder="URL de l'image" value={formData.imageUrl} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <textarea className="form-textarea" name="description" placeholder="Description du véhicule" value={formData.description} onChange={handleChange} />
                </div>
                
                <button type="submit" className="btn-submit">
                    {editingId ? "Enregistrer les modifications" : "Ajouter au catalogue"}
                </button>
                
                {editingId && (
                    <button type="button" className="btn-cancel" onClick={() => { setEditingId(null); setFormData({ marque: '', modele: '', type: 'Achat', prix: '', kilometrage: '', description: '', imageUrl: '' }); }}>
                        Annuler la modification
                    </button>
                )}
            </form>

            <h3>Véhicules actuels en base</h3>
            <table className="catalog-table">
                <thead>
                    <tr>
                        <th>Marque</th>
                        <th>Modèle</th>
                        <th>Type Actuel</th>
                        <th>Prix</th>
                        <th>Kilométrage</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map(v => (
                        <tr key={v.id}>
                            <td>{v.marque}</td>
                            <td>{v.modele}</td>
                            <td>{v.type}</td>
                            <td>{v.prix} €</td>
                            <td>{v.kilometrage} km</td>
                            <td>
                                <button className="btn-action" onClick={() => { setEditingId(v.id); setFormData(v); }}>Modifier</button>
                                <button className="btn-action" type="button" onClick={() => handleToggleType(v)}>
                                    Basculer en {v.type === 'Achat' ? 'LLD' : 'Achat'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}