import { useCartStore } from '../store/cartStore';

export const useCart = () => {
    const {
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems
    } = useCartStore();

    const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const totalItems = getTotalItems();

    return {
        items,
        totalPrice,
        totalItems,
        addItem,
        removeItem,
        updateQuantity,
        clearCart
    };
};
