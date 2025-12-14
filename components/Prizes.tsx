'use client';

import { motion } from 'framer-motion';
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import React, { useState, useEffect } from 'react';

const prizes = [
    {
        rank: 'Winner',
        title: 'Agentic AI',
        prize: 'Winner',
        description: '1st Place in Agentic AI Track',
        color: 'border-gold-500',
        glow: 'shadow-[0_0_50px_rgba(255,215,0,0.5)]',
        bg: 'bg-gradient-to-b from-gold-900 to-black',
        scale: 1.05,
    },
    {
        rank: 'Runner Up',
        title: 'Agentic AI',
        prize: 'Runner Up',
        description: '2nd Place in Agentic AI Track',
        color: 'border-gray-300',
        glow: 'shadow-[0_0_30px_rgba(192,192,192,0.3)]',
        bg: 'bg-gradient-to-b from-gray-900 to-black',
    },
    {
        rank: 'Winner',
        title: 'Open Innovation',
        prize: 'Winner',
        description: '1st Place in Open Innovation',
        color: 'border-gold-500',
        glow: 'shadow-[0_0_50px_rgba(255,215,0,0.5)]',
        bg: 'bg-gradient-to-b from-gold-900 to-black',
        scale: 1.05,
    },
    {
        rank: 'Runner Up',
        title: 'Open Innovation',
        prize: 'Runner Up',
        description: '2nd Place in Open Innovation',
        color: 'border-gray-300',
        glow: 'shadow-[0_0_30px_rgba(192,192,192,0.3)]',
        bg: 'bg-gradient-to-b from-gray-900 to-black',
    },
];

const Prizes = () => {
    return (
        <section id="prizes" className="py-20 px-6 relative z-10">
            <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-20 text-center">
                Mission <span className="text-gold-500">Bounties</span>
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 max-w-6xl mx-auto">
                {prizes.map((prize, index) => (
                    <PrizeCard key={index} prize={prize} index={index} />
                ))}
            </div>
        </section>
    );
};

const PrizeCard = ({ prize, index }: { prize: any, index: number }) => {
    const [hovered, setHovered] = useState(false);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            onMouseEnter={() => !isTouch && setHovered(true)}
            onMouseLeave={() => !isTouch && setHovered(false)}
            onClick={() => isTouch && setHovered(!hovered)}
            className={`relative p-8 rounded-2xl border-2 ${prize.color} ${prize.bg} ${prize.glow} bg-black w-full md:w-1/3 text-center flex flex-col items-center justify-center aspect-[3/4] overflow-hidden group cursor-pointer`}
            style={{ transform: prize.scale ? `scale(${prize.scale})` : 'scale(1)' }}
        >
            <div className="absolute inset-0 h-full w-full z-0 opacity-40">
                {hovered && (
                    <CanvasRevealEffect
                        animationSpeed={5}
                        containerClassName="bg-transparent"
                        colors={prize.rank === 'Winner' ? [[200, 169, 101]] : [[192, 192, 192]]}
                        dotSize={3}
                    />
                )}
            </div>
            <div className="relative z-10 transition-colors duration-500">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center">
                    {!hovered && (
                        <div className="text-center">
                            <h3 className="text-3xl font-orbitron font-bold text-white tracking-widest">CLASSIFIED</h3>
                            <p className="text-gold-500 text-sm font-inter tracking-[0.3em] mt-2">TOP SECRET</p>
                        </div>
                    )}
                </div>
                <motion.div
                    animate={{
                        opacity: hovered ? 1 : 0,
                        y: hovered ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center"
                >
                    <h3 className="text-2xl font-inter text-gray-300 mb-2">{prize.rank}</h3>
                    <h4 className="text-4xl font-orbitron font-bold text-white mb-6">{prize.title}</h4>
                    <div className="text-5xl font-bold text-gold-500 font-orbitron">{prize.prize}</div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Prizes;
