import { useEffect, useRef } from 'react';

const useIdleTimeout = (logoutCallback, timeout = 300000) => {
    const timeoutRef = useRef(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(logoutCallback, timeout);
    };

    useEffect(() => {
        const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart', 'touchmove', 'touchend', 'touchcancel'];

        const handleActivity = () => resetTimeout();

        events.forEach(event => window.addEventListener(event, handleActivity));

        resetTimeout();

        return () => {
            clearTimeout(timeoutRef.current);
            events.forEach(event => window.removeEventListener(event, handleActivity));
        };
    }, [logoutCallback, timeout]);

    return null;
};

export default useIdleTimeout;
