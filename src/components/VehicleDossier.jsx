import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import './VehicleDossier.css';

export default function VehicleDossier() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tab, setTab] = useState('form');
    const [form, setForm] = useState({ name: '', email: '', type: 'LLD', idFile: null, domFile: null });
    const [liste, setListe] = useState([]);
    const [msg, setMsg] = useState('');

    const chercherSuivi = async (email) => {
        setForm({ ...form, email });
        const res = await fetch(`${API_BASE_URL}/api/dossiers/suivi?email=${email}`);
        if (res.ok) setListe(await res.json());
    };

    const envoyer = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('vehicleId', id || 1);
        data.append('clientName', form.name);
        data.append('clientEmail', form.email);
        data.append('typeContrat', form.type);
        data.append('pieceIdentite', form.idFile);
        data.append('justificatifDomicile', form.domFile);

        const res = await fetch(`${API_BASE_URL}/api/dossiers/depot`, { method: 'POST', body: data });
        
        if (res.ok) {
            setMsg("Félicitations ! Ton dossier a bien été enregistré.");
            setForm({ name: '', email: form.email, type: 'LLD', idFile: null, domFile: null });
            e.target.reset(); 
        } else {
            setMsg("Erreur lors de l'envoi");
        }
    
    };

    return (
        <div className="dossier-box">
            <div className="tabs">
                <button className={tab === 'form' ? 'active' : ''} onClick={() => setTab('form')}>Dépôt</button>
                <button className={tab === 'suivi' ? 'active' : ''} onClick={() => setTab('suivi')}>Suivi</button>
            </div>
            
            {msg && <p className="msg-info">{msg}</p>}

            {tab === 'form' ? (
                <form onSubmit={envoyer}>
                    <div className="f-group"><label>Nom :</label><input type="text" required onChange={e => setForm({...form, name: e.target.value})}/></div>
                    <div className="f-group"><label>Email :</label><input type="email" required onChange={e => setForm({...form, email: e.target.value})}/></div>
                    <div className="f-group"><label>Option :</label>
                        <select onChange={e => setForm({...form, type: e.target.value})}><option value="LLD">LLD</option><option value="ACHAT">Achat</option></select>
                    </div>
                    <div className="f-group"><label>ID (PDF/JPG) :</label><input type="file" accept=".pdf,.jpg,.jpeg" required onChange={e => setForm({...form, idFile: e.target.files[0]})}/></div>
                    <div className="f-group"><label>Domicile (PDF/JPG) :</label><input type="file" accept=".pdf,.jpg,.jpeg" required onChange={e => setForm({...form, domFile: e.target.files[0]})}/></div>
                    <button className="btn">Envoyer</button>
                </form>
            ) : (
                <div>
                    <div className="f-group">
                        <label>Email :</label>
                        <input 
                            type="email" 
                            placeholder="Ex: sophie@test.com" 
                            value={form.email || ''} 
                            required 
                            onChange={e => setForm({...form, email: e.target.value})}
                        />
                    </div>

                    <div className="f-group">
                        <label>Mot de passe :</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            value={form.password || ''} 
                            required 
                            onChange={e => setForm({...form, password: e.target.value})}
                        />
                    </div>

                    <button 
                        className="btn btn-go-dashboard" 
                        onClick={async () => {
                            if (!form.email || !form.password) {
                                setMsg("Veuillez remplir votre email et votre mot de passe.");
                                return;
                            }

                            try {
                                const res = await fetch(`${API_BASE_URL}/api/auth/connexion`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ email: form.email, password: form.password })
                                });

                                const data = await res.json();

                                if (res.ok) {
                                    setMsg(""); 
                                    navigate('/dashboard', { state: { email: data.email, role: data.role } });
                                } else {
                                    setMsg(data.message || "Échec de la connexion.");
                                }
                            } catch (error) {
                                setMsg("Impossible de joindre le serveur d'authentification.");
                            }
                        }}
                    >
                        Accéder à mon espace
                    </button>
                </div>
            )}
        </div>
    );
}