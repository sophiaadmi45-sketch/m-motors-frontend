import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import './VehicleDossier.css';

export default function VehicleDossier() {
    const { id } = useParams();
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
        setMsg(res.ok ? "Succès !" : "Erreur lors de l'envoi");
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
                    <input type="email" placeholder="Votre email" value={form.email} onChange={e => chercherSuivi(e.target.value)} className="suivi-input"/>
                    {liste.map(d => (
                        <div key={d.id} className="suivi-item">
                            Dossier N°{d.id} ({d.typeContrat}) : <strong>{d.statut}</strong>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}