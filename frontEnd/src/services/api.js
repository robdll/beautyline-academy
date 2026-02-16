export const submitContactForm = async (formData) => {
    const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        throw new Error(errorText || "Si è verificato un errore durante l'invio del messaggio.");
    }

    return await response.json().catch(() => ({ success: true }));
};
