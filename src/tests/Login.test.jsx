import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import Login from '../components/Login';

describe('Page de Connexion M-Motors', () => {

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('Scénario 1 : Connexion réussie Espace Client', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ token: 'fake-jwt-token', role: 'CLIENT' }),
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const inputEmail = screen.getAllByLabelText(/adresse e-mail/i)[0];
    const inputPassword = screen.getAllByLabelText(/mot de passe/i)[0];
    fireEvent.change(inputEmail, { target: { value: 'client@test.com' } });
    fireEvent.change(inputPassword, { target: { value: 'motDePasseClient123' } });

    const ongletClient = screen.getAllByRole('button', { name: /espace client/i })[0];
    fireEvent.click(ongletClient);

    const boutonConnexion = screen.getAllByRole('button', { name: /se connecter/i })[0];
    fireEvent.click(boutonConnexion);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  test('Scénario 2 : Échec de connexion (Mauvais identifiants)', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ message: 'Identifiants incorrects' }),
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const inputEmail = screen.getAllByLabelText(/adresse e-mail/i)[0];
    const inputPassword = screen.getAllByLabelText(/mot de passe/i)[0];
    fireEvent.change(inputEmail, { target: { value: 'faux@mmotors.com' } });
    fireEvent.change(inputPassword, { target: { value: 'mauvais_mdp' } });

    const boutonConnexion = screen.getAllByRole('button', { name: /se connecter/i })[0];
    fireEvent.click(boutonConnexion);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  test('Scénario 3 : Erreur réseau totale (Serveur Crashé)', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network Error'));

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const inputEmail = screen.getAllByLabelText(/adresse e-mail/i)[0];
    const inputPassword = screen.getAllByLabelText(/mot de passe/i)[0];
    fireEvent.change(inputEmail, { target: { value: 'admin@mmotors.com' } });
    fireEvent.change(inputPassword, { target: { value: 'admin123' } });

    const boutonConnexion = screen.getAllByRole('button', { name: /se connecter/i })[0];
    fireEvent.click(boutonConnexion);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  test('Scénario 4 : Connexion réussie Espace Professionnel', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ token: 'fake-jwt-token', role: 'ADMIN' }),
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    
    const ongletPro = screen.getAllByRole('button', { name: /espace professionnel/i })[0];
    fireEvent.click(ongletPro);

    const inputEmail = screen.getAllByLabelText(/adresse e-mail/i)[0];
    const inputPassword = screen.getAllByLabelText(/mot de passe/i)[0];
    fireEvent.change(inputEmail, { target: { value: 'pro@mmotors.com' } });
    fireEvent.change(inputPassword, { target: { value: 'secretProMmotors' } });

    const boutonConnexion = screen.getAllByRole('button', { name: /se connecter/i })[0];
    fireEvent.click(boutonConnexion);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

});