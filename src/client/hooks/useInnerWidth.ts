import { useState, useEffect } from 'react';

function debounce(fn: Function, delay: number) {
    let timeoutId: NodeJS.Timeout | null = null;
    return function (...args: any[]) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

export default function useWindowWidth(): number {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = (): void => {
            setWidth(window.innerWidth);
        };
        const debouncedHandleResize = debounce(handleResize, 100);

        window.addEventListener('resize', debouncedHandleResize);
        return (): void => window.removeEventListener('resize', debouncedHandleResize);
    }, []);

    return width;
};
