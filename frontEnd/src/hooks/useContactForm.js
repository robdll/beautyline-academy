import { useState } from 'react';
import { contactApi } from '../api/contact.api';
import { USE_FETCH_CONSTANTS } from '../constants/hooks.constants';

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
                message: USE_FETCH_CONSTANTS.USE_FETCH_SUCCESS,
            });

            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                message: ''
            });
        } catch (error) {
            console.error(USE_FETCH_CONSTANTS.USE_FETCH_ERROR, error);
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
