import { useState, useEffect } from 'react';
import { getProducts } from '../services/productService';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();

                if (!Array.isArray(data)) {
                    throw new Error('Expected products response to be an array');
                }

                const normalizedProducts = data.map((product) => ({
                    // Preserve all existing fields first
                    ...product,
                    // Then normalize into the shape expected by the UI
                    id: product.id ?? product._id,
                    title: product.title ?? product.name ?? '',
                    publicId: product.publicId ?? product.image ?? '',
                }));

                setProducts(normalizedProducts);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return {
        products,
        loading,
        error
    };
};
