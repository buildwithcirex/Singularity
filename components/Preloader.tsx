'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [started, setStarted] = useState(false);
    const [exit, setExit] = useState(false);

    const handleStart = () => {
        const audio = new Audio('/logo_sound.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio playback failed', e));
        setStarted(true);
    };

    useEffect(() => {
        if (!started) return;

        const timer = setTimeout(() => {
            setExit(true);
            setTimeout(onComplete, 600); // Reduced delay for faster transition
        }, 1200); // Shorter duration
        return () => clearTimeout(timer);
    }, [started, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
        >
            {/* Background Overlay - Fades out */}
            <AnimatePresence>
                {!exit && (
                    <motion.div
                        className="absolute inset-0 bg-black pointer-events-auto"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {!started && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleStart}
                        className="px-8 py-4 border border-gold-500/50 text-gold-500 font-orbitron text-xl uppercase tracking-widest rounded-full hover:bg-gold-500/10 transition-colors z-20 relative pointer-events-auto"
                    >
                        Enter Singularity
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Ripple Effect - Rendered when started */}
            {started && (
                <motion.div
                    className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
                    animate={exit ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full border-2 border-gold-500"
                            initial={{ width: 0, height: 0, opacity: 1 }}
                            animate={{
                                width: '800px',
                                height: '800px',
                                opacity: 0,
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.4,
                                ease: "easeOut"
                            }}
                        />
                    ))}
                </motion.div>
            )}

            {/* Logo Animation - Persists until unmount, moved by layoutId */}
            <motion.div
                layoutId="main-logo"
                className="absolute inset-0 m-auto w-40 h-40 z-10 pointer-events-none"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                    scale: started ? 1 : 0.8,
                    opacity: started ? 1 : 0
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <Image src="/logo.svg" alt="Singularity Logo" fill className="object-contain" priority />
            </motion.div>
        </motion.div>
    );
}
