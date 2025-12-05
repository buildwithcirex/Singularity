'use client';

import { motion } from 'framer-motion';

const prizes = [
    {
        rank: 'Winner',
        title: 'Agentic AI',
        prize: 'Winner',
        description: '1st Place in Agentic AI Track',
        color: 'border-gold-500',
        glow: 'shadow-[0_0_50px_rgba(255,215,0,0.5)]',
        bg: 'bg-gradient-to-b from-gold-900/20 to-black',
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
        bg: 'bg-gradient-to-b from-gold-900/20 to-black',
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
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className={`relative p-8 rounded-2xl border-2 ${prize.color} ${prize.bg} ${prize.glow} w-full md:w-1/3 text-center flex flex-col items-center justify-center aspect-[3/4]`}
                        style={{ transform: prize.scale ? `scale(${prize.scale})` : 'scale(1)' }}
                    >
                        <h3 className="text-2xl font-inter text-gray-300 mb-2">{prize.rank}</h3>
                        <h4 className="text-4xl font-orbitron font-bold text-white mb-6">{prize.title}</h4>
                        <div className="text-5xl font-bold text-gold-500 font-orbitron">{prize.prize}</div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Prizes;
