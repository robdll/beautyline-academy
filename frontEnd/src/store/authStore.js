import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const API_ORIGIN = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, "");
const API_URL = `${API_ORIGIN}/api`;

export const useAuthStore = create(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      user: null,
      token: null,

      login: async (email, password) => {
        try {
          const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Errore durante il login');
          }

          set({ 
            isLoggedIn: true, 
            token: data.token,
            user: data.user
          });
          return { success: true };
        } catch (err) {
          return { success: false, message: err.message };
        }
      },

      register: async (name, email, password) => {
        try {
          const response = await fetch(`${API_URL}/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Errore durante la registrazione');
          }

          set({ 
            isLoggedIn: Boolean(data.token),
            token: data.token || null,
            user: data.user || data
          });
          return { success: true };
        } catch (err) {
          return { success: false, message: err.message };
        }
      },

      logout: () => {
        set({ isLoggedIn: false, user: null, token: null });
        localStorage.removeItem('auth-storage');
      },

      updateUser: async (name, email) => {
        const { user, token } = get();
        const userId = user?._id || user?.id;

        if (!userId || !token) {
          return { success: false, message: 'Non sei autenticato o manca ID utente.' };
        }

        try {
          const response = await fetch(`${API_URL}/user/${userId}`, {
            method: 'PUT',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, email }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Errore durante l\'aggiornamento del profilo');
          }

          set(() => ({ user: data }));
          return { success: true, message: 'Profilo aggiornato con successo' };
        } catch (err) {
          return { success: false, message: err.message };
        }
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);
