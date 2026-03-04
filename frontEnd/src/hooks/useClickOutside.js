import { useEffect } from 'react';

export function useClickOutside(ref, handler, active = true) {
    useEffect(() => {
        if (!active) return;

        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                handler(event);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, handler, active]);
}
