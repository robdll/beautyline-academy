import apiClient from '../utils/api.client';


export const authApi = {
    login: async (email, password) => {
        return apiClient('/login', {
            body: { email, password }
        });
    },

    register: async (userData) => {
        return apiClient('/user', {
            body: userData
        });
    },

    updateUser: async (userId, userData) => {
        return apiClient(`/user/${userId}`, {
            method: 'PUT',
            body: userData
        });
    }
};
