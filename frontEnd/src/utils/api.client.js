import { STORAGE_KEYS } from '../constants/storage.constants';

const API_ORIGIN = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, "");
const API_URL = `${API_ORIGIN}/api`;

async function apiClient(endpoint, { body, ...customConfig } = {}) {
    const headers = { 'Content-Type': 'application/json' };

    const authData = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (authData) {
        try {
            const { state } = JSON.parse(authData);
            if (state?.token) {
                headers.Authorization = `Bearer ${state.token}`;
            }
        } catch (e) {
            console.error(`Error parsing ${STORAGE_KEYS.AUTH}`, e);
        }
    }

    const config = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Qualcosa è andato storto');
    }

    return data;
}

export default apiClient;
