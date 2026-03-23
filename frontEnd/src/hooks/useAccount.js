import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { ACCOUNT_CONSTANTS } from '../constants/hooks.constants';

export const useAccount = () => {
    const { user, isLoggedIn, logout, updateUser } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });

    useEffect(() => {
        if (user && !isEditing) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
            });
        }
    }, [user, isEditing]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        if (e) e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await updateUser(formData.name, formData.email);

            if (result && result.success) {
                setIsEditing(false);
            } else {
                setError(result?.message || ACCOUNT_CONSTANTS.ACCOUNT_UPDATE_ERROR);
            }
        } catch {
            setError(ACCOUNT_CONSTANTS.ACCOUNT_UPDATE_ERROR);
        } finally {
            setIsLoading(false);
        }
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setFormData({
            name: user?.name || '',
            email: user?.email || ''
        });
    };

    const startEdit = () => setIsEditing(true);

    return {
        user,
        isLoggedIn,
        isEditing,
        isLoading,
        error,
        formData,
        handleChange,
        handleSave,
        cancelEdit,
        startEdit,
        logout
    };
};
