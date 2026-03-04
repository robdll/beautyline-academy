import { useCartStore } from '../store/cartStore';

export const useCart = () => {
    const items = useCartStore((state) => state.items);
    const addItem = useCartStore((state) => state.addItem);
    const removeItem = useCartStore((state) => state.removeItem);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const clearCart = useCartStore((state) => state.clearCart);
    const getTotalItems = useCartStore((state) => state.getTotalItems);

    const totalPrice = items.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
    );
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
