import { useState } from 'react';
import { contactApi } from '../api/contact.api';

export const useContactForm = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = useState({ state: 'idle', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ state: 'loading', message: '' });

        try {
            await contactApi.sendMessage(formData);

            setStatus({
                state: 'success',
                message: '✓ Messaggio inviato con successo! Ti contatteremo a breve.',
            });

            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                message: ''
            });
        } catch (error) {
            console.error("Submission error:", error);
            setStatus({
                state: 'error',
                message: USE_FETCH_CONSTANTS.USE_FETCH_ERROR,
            });
        }
    };

    return {
        formData,
        status,
        handleChange,
        handleSubmit
    };
};
