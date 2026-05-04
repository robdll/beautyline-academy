import { STORAGE_KEYS } from '../constants/storage.constants';

const REMOTE_URL = 'https://beautyline-academy-kffv.onrender.com';
const LOCAL_URL = 'http://localhost:3000';

const API_ORIGIN = (import.meta.env.VITE_API_URL || REMOTE_URL).replace(/\/$/, "");
const API_URL = `${API_ORIGIN}/api`;
export const API_URL_PRODUCTS_GET = `${API_ORIGIN}/api/product`;

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

    let response;
    try {
        response = await fetch(`${API_URL}${endpoint}`, config);
    } catch (e) {
        if (API_ORIGIN !== LOCAL_URL) {
            try {
                console.warn(`Primary API failed, falling back to local: ${LOCAL_URL}/api${endpoint}`);
                response = await fetch(`${LOCAL_URL}/api${endpoint}`, config);
            } catch (fallbackError) {
                throw e; 
            }
        } else {
            throw e;
        }
    }

    const contentType = response.headers.get('content-type') || '';
    const text = await response.text();

    let data = null;

    if (text && contentType.includes('application/json')) {
        try {
            data = JSON.parse(text);
        } catch (e) {
            console.error('Error parsing JSON response', e);
        }
    }

    if (!response.ok) {
        const message =
            (data && data.message) ||
            text ||
            'Qualcosa è andato storto';

        throw new Error(message);
    }

    return data !== null ? data : text;
}

export default apiClient;
