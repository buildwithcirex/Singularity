'use client';

import { motion } from 'framer-motion';

const sponsors = {
    galactic: ['ABC Corp', 'XYZ Ltd', '123 Inc'],
    stellar: ['Sponsor One', 'Sponsor Two', 'Sponsor Three', 'Sponsor Four'],
    planetary: ['Partner A', 'Partner B', 'Partner C', 'Partner D', 'Partner E'],
};

const SponsorTier = ({ title, companies, size }: { title: string; companies: string[]; size: string }) => (
    <div className="mb-16 w-full">
        <h3 className="text-2xl font-orbitron text-gold-500 mb-8 text-center uppercase tracking-widest">{title}</h3>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {companies.map((company, index) => (
                <motion.div
                    key={company}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-gold-500 transition-all cursor-pointer group ${size}`}
                >
                    <span className="text-white/50 font-orbitron font-bold group-hover:text-gold-500 transition-colors text-xl">
                        {company}
                    </span>
                </motion.div>
            ))}
        </div>
    </div>
);

const Sponsors = () => {
    return (
        <section id="sponsors" className="py-20 px-6 relative z-10">
            <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-20 text-center">
                Mission <span className="text-gold-500">Partners</span>
            </h2>
            <div className="max-w-6xl mx-auto flex flex-col items-center">
                <SponsorTier title="Galactic Tier" companies={sponsors.galactic} size="w-64 h-32" />
                <SponsorTier title="Stellar Tier" companies={sponsors.stellar} size="w-48 h-24" />
                <SponsorTier title="Planetary Tier" companies={sponsors.planetary} size="w-32 h-16" />
            </div>
        </section>
    );
};

export default Sponsors;
