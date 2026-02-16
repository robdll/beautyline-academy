import { useState, useEffect } from 'react';

/**
 * Hook to manage carousel state, auto-rotation, and navigation.
 * @param {number} totalSlides - The number of slides in the carousel.
 * @param {number} intervalMs - Auto-rotation interval in milliseconds.
 */
export default function useCarousel(totalSlides, intervalMs = 5000) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (totalSlides <= 1) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, intervalMs);

        return () => clearInterval(timer);
    }, [totalSlides, intervalMs]);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const goToSlide = (index) => {
        if (index >= 0 && index < totalSlides) {
            setCurrentSlide(index);
        }
    };

    return {
        currentSlide,
        prevSlide,
        nextSlide,
        goToSlide
    };
}
