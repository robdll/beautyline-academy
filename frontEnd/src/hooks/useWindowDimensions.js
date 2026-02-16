import { useState, useEffect } from 'react';

/**
 * Hook to track window dimensions and provide optimized widths/heights
 * for Cloudinary images or other responsive needs.
 */
export default function useWindowDimensions() {
    const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

    useEffect(() => {
        const updateDimensions = () => {
            const w = window.innerWidth;
            if (w < 640) {
                setDimensions({ width: 640, height: 960 });
            } else if (w < 1024) {
                setDimensions({ width: 1024, height: 1280 });
            } else {
                setDimensions({ width: 1920, height: 1080 });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    return dimensions;
}
