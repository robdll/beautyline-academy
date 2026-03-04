import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '../api/auth.api';
import { STORAGE_KEYS } from '../constants/storage.constants';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      user: null,
      token: null,

      login: async (email, password) => {
        try {
          const data = await authApi.login(email, password);
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
          const data = await authApi.register({ name, email, password });
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
        localStorage.removeItem(STORAGE_KEYS.AUTH);
      },

      updateUser: async (name, email) => {
        const { user } = get();
        const userId = user?._id || user?.id;

        if (!userId) {
          return { success: false, message: 'Non sei autenticato o manca ID utente.' };
        }

        try {
          const data = await authApi.updateUser(userId, { name, email });
          set(() => ({ user: data }));
          return { success: true, message: 'Profilo aggiornato con successo' };
        } catch (err) {
          return { success: false, message: err.message };
        }
      }
    }),
    {
      name: STORAGE_KEYS.AUTH,
    }
  )
);
