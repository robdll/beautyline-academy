import { useState, useEffect, useRef } from 'react';

export default function CountUp({ end, duration = 2000, icon: Icon, title }) {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (countRef.current) {
                        observer.unobserve(countRef.current);
                    }
                }
            }, 
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let frameId;
        let startTimestamp = null;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                frameId = window.requestAnimationFrame(step);
            }
        };
        
        frameId = window.requestAnimationFrame(step);

        return () => {
            if (frameId) {
                window.cancelAnimationFrame(frameId);
            }
        };
    }, [end, duration, isVisible]);

    return (
        <div className="flex flex-col gap-10">
            {Icon && <Icon className="mx-auto w-16 h-16 text-white" aria-hidden="true" />}
            <span ref={countRef} className="text-4xl md:text-4xl text-white font-bold">
                +{count}
            </span>
            <h5 className="text-white text-lg font-medium">{title}</h5>
        </div>
    );
}
