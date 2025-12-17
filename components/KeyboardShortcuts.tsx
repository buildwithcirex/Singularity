'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const shortcuts = [
    { key: 'H', description: 'Hero Section' },
    { key: 'M', description: 'Mission Briefing' },
    { key: 'T', description: 'Track (Timeline)' },
    { key: 'S', description: 'Sponsors' },
    { key: 'N', description: 'Navbar (Top)' },
];

const KeyboardShortcuts = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Hide after 5 seconds
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 5000);

        // Show again on any key press
        const handleKeyPress = () => {
            setIsVisible(true);
            clearTimeout(timer);
            setTimeout(() => setIsVisible(false), 3000);
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-8 right-8 z-50 bg-black/50 backdrop-blur-sm border border-gold-500/30 rounded-lg p-4 shadow-lg"
                >
                    <h3 className="text-gold-500 font-orbitron text-sm mb-3 font-bold">
                        Keyboard Shortcuts
                    </h3>
                    <div className="space-y-2">
                        {shortcuts.map(({ key, description }) => (
                            <div key={key} className="flex items-center gap-3">
                                <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white font-mono text-xs min-w-[24px] text-center">
                                    {key}
                                </kbd>
                                <span className="text-gray-300 text-xs font-inter">
                                    {description}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default KeyboardShortcuts;
