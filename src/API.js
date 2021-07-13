const API_URL = 'http://localhost:1337';

export async function listPlaceEntries() { 
    const response = await fetch(`${API_URL}/api/places`);
    return response.json();
}


export async function createPlace(place) { 
    const response = await fetch(`${API_URL}/api/places`,{
    method: 'POST',
    headers:{
        'content-type': 'application/json',

    },
    body: JSON.stringify(place)
    });
    return response.json();
}

