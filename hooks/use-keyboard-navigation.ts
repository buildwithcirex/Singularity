'use client';

import { useEffect } from 'react';

export const useKeyboardNavigation = (onNavbarToggle?: () => void) => {
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();
            
            let targetId: string | null = null;

            switch (key) {
                case 'h':
                    targetId = 'hero';
                    break;
                case 'm':
                    targetId = 'mission';
                    break;
                case 't':
                    targetId = 'timeline';
                    break;
                case 's':
                    targetId = 'sponsors';
                    break;
                case 'n':
                    // Toggle navbar
                    if (onNavbarToggle) {
                        onNavbarToggle();
                    }
                    return;
                default:
                    return;
            }

            if (targetId) {
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);
};
