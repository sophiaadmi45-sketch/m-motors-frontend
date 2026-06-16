const API_BASE_URL = 'http://localhost:8080';

export async function getBackendStatus() {
  try {
    const response = await fetch(`${API_BASE_URL}/test`);
    if (!response.ok) throw new Error('Erreur');
    return await response.text();
  } catch (error) {
    return "❌ Impossible de se connecter au backend";
  }
}