import apiClient from '../utils/api.client';


export const contactApi = {
    sendMessage: async (formData) => {
        return apiClient('/contact', {
            body: formData
        });
    }
};
