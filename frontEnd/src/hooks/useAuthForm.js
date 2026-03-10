import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { ROUTES } from '../constants/routes.constants';

export const useAuthForm = () => {
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode') || 'login';
    const isLogin = mode === 'login';

    const { login, register } = useAuthStore();
    const navigate = useNavigate();

    const [status, setStatus] = useState({ state: 'idle', message: '' });
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setError('');
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        if (isLogin) {
            if (!formData.email || !formData.password) {
                setError('Compila tutti i campi per accedere.');
                return false;
            }
        } else {
            if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
                setError('Compila tutti i campi per registrarti.');
                return false;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Le password non coincidono.');
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validate()) return;

        setStatus({ state: 'submitting', message: '' });

        try {
            let result;
            if (isLogin) {
                result = await login(formData.email, formData.password);
            } else {
                result = await register(formData.name, formData.email, formData.password);
            }

            if (result.success) {
                const redirectTo = searchParams.get('redirect') || ROUTES.HOME;
                navigate(redirectTo);
            } else {
                setError(result.message);
                setStatus({ state: 'idle', message: '' });
            }
        } catch {
            setError('Si è verificato un errore imprevisto.');
            setStatus({ state: 'idle', message: '' });
        }
    };

    return {
        formData,
        isLogin,
        status,
        error,
        handleChange,
        handleSubmit
    };
};
