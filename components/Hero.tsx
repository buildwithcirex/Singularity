'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import RippleButton from '@/components/animata/button/ripple-button';

const Countdown = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {git
        const targetDate = new Date('2026-01-17T00:00:00'); // Updated date
        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex gap-4 mt-8">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="flex flex-col items-center">
                    <span className="text-4xl font-orbitron text-white">{value.toString().padStart(2, '0')}</span>
                    <span className="text-sm text-gold-500 uppercase">{unit}</span>
                </div>
            ))}
        </div>
    );
};

const Hero = () => {
    return (
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center pt-20 px-4 relative overflow-hidden">

            {/* Built with CIREX - Top Right */}
            <motion.a
                href="https://github.com/yourusername/yourrepo"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: -20 }}
                animate={{ 
                    opacity: 1, 
                    y: 0
                }}
                transition={{ 
                    opacity: { duration: 1, delay: 1 },
                    y: { duration: 1, delay: 1 }
                }}
                className="absolute top-8 right-8 w-40 md:w-52 h-16 md:h-20 z-20 opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
            >
                <img 
                    src="/buildwithcirex.svg" 
                    alt="Built with CIREX" 
                    className="w-full h-full object-contain"
                />
            </motion.a>

            {/* Satellite Image */}
            {/* Satellite Image */}
            <motion.div
                initial={{ x: -500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                    duration: 2,
                    delay: 2.5,
                    ease: "easeOut"
                }}
                className="absolute top-20 left-0 md:-left-10 w-44 h-44 md:w-[27rem] md:h-[27rem] opacity-80 pointer-events-none z-0 hidden md:block"
            >
                <motion.img
                    animate={{ y: [0, -20, 0] }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    src="/Satellite.svg"
                    alt="Satellite"
                    className="w-full h-full object-contain"
                />
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="text-4xl sm:text-6xl md:text-8xl font-orbitron font-bold text-white mb-4 leading-tight tracking-wider relative z-10"
            >
                Singularity
            </motion.h1>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col items-center relative z-10"
            >
                <h2 className="text-lg sm:text-2xl md:text-[34px] font-orbitron text-gold-500 mb-8 px-4">
                    Building... cause we love it 
                </h2>
                <p className="text-base sm:text-lg md:text-2xl font-inter text-gray-300 mb-8 px-4">
                    January 17th - 18th, 2026 • 24hr Offline Event
                </p>
                <RippleButton onClick={() => window.open('https://luma.com/369a1jle', '_blank')}>
                    Register Now!!
                </RippleButton>
                <Countdown />
            </motion.div>
        </section>
    );
};

export default Hero;
