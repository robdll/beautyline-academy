
export const formatCurrency = (value) => {
    return new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR',
    }).format(value);
};


export const formatDate = (date) => {
    return new Intl.DateTimeFormat('it-IT').format(new Date(date));
};
