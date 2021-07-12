const API_URL = 'http://localhost:1337';

export async function listPlaceEntries() { 
    const response = await fetch(`${API_URL}/api/places`);
    return response.json();
}