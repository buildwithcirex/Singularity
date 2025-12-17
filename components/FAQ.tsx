'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Radio } from 'lucide-react';

const faqs = [
    {
        question: 'Is there a registration fee to join the mission?',
        answer: 'Yes. To ensure that every Cadet is fully committed to the 12-day engagement and the final launch, there is a nominal commitment fee. This grants you access to all workshops, the 24-hour hackathon, swag kits, and meals.',
    },
    {
        question: 'What is the required team size?',
        answer: 'You can form a squad of 1 to 4 members. You can fly solo, but a full crew is recommended to handle the workload of the 24-hour Launch Sequence.',
    },
    {
        question: 'What if I don\'t have a team?',
        answer: 'No problem. Register individually, and you can connect with fellow Cadets during the \'Flight Training\' phase to form a complete crew before the main event.',
    },
    {
        question: 'I am a first-year student with zero coding experience. Can I join?',
        answer: 'Absolutely. Singularity is designed exactly for this. Our \'Flight Training\' phase (Jan 6 - Jan 16) is built to take you from zero to mission-ready. There is a first time for everything—start your journey here.',
    },
    {
        question: 'What exactly will the workshops teach us?',
        answer: 'The \'Flight Training\' covers the modern tech stack needed to survive the hackathon: Git/GitHub, API Development, Database Design, Cloud Deployment, and an intro to DevOps. By the time the hackathon starts, you will have the skills to build.',
    },

];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="min-h-screen py-20 px-6 relative z-10 flex flex-col items-center justify-center">
            {/* Header with Communication Animation */}
            <div className="max-w-4xl w-full mb-16">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <motion.div
                            animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Radio className="w-8 h-8 text-gold-500" />
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-white">
                            Comms <span className="text-gold-500">Relay</span>
                        </h2>
                        <motion.div
                            animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1
                            }}
                        >
                            <Radio className="w-8 h-8 text-gold-500" />
                        </motion.div>
                    </div>
                    <p className="text-gray-400 font-inter text-sm uppercase tracking-widest">
                        [ INCOMING TRANSMISSION ]
                    </p>
                </motion.div>
            </div>

            {/* Terminal-style FAQ Container */}
            <div className="max-w-4xl w-full">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-gray-900/80 via-black/90 to-gray-900/80 border-2 border-gold-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl"
                >
                    {/* Terminal Header */}
                    <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gold-500/20">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        </div>
                        <span className="text-xs text-gray-500 font-mono ml-4">
                            SINGULARITY_TERMINAL_V2.0 / STATUS: ACTIVE
                        </span>
                    </div>

                    {/* FAQ Items */}
                    <div className="space-y-3">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="relative border border-gold-500/20 rounded-lg overflow-hidden bg-black/40 backdrop-blur-sm hover:border-gold-500/50 transition-all duration-300">
                                    {/* Active Indicator Line */}
                                    <motion.div
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold-500 to-transparent"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: activeIndex === index ? 1 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    
                                    <button
                                        onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                        className="w-full flex items-start gap-4 p-5 text-left hover:bg-white/5 transition-colors"
                                    >
                                        {/* Question Number */}
                                        <div className="shrink-0 w-8 h-8 rounded bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
                                            <span className="text-gold-500 font-orbitron font-bold text-sm">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                        </div>
                                        
                                        <div className="flex-1">
                                            <span className="text-lg font-inter font-medium text-white group-hover:text-gold-500 transition-colors">
                                                {faq.question}
                                            </span>
                                        </div>
                                        
                                        <motion.div
                                            animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="shrink-0"
                                        >
                                            <ChevronDown className="w-6 h-6 text-gold-500" />
                                        </motion.div>
                                    </button>
                                    
                                    <AnimatePresence initial={false}>
                                        {activeIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                style={{ overflow: 'hidden' }}
                                            >
                                                <div className="px-5 pb-5 pl-[4.5rem]">
                                                    <motion.div
                                                        initial={{ y: -10 }}
                                                        animate={{ y: 0 }}
                                                        className="p-4 bg-gold-500/5 border-l-2 border-gold-500/50 rounded-r"
                                                    >
                                                        <p className="text-gray-300 font-inter leading-relaxed">
                                                            {faq.answer}
                                                        </p>
                                                    </motion.div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Terminal Footer */}
                    <div className="mt-6 pt-4 border-t border-gold-500/20 flex justify-between items-center">
                        <span className="text-xs text-gray-600 font-mono">
                            {faqs.length} MESSAGES RECEIVED
                        </span>
                        <span className="text-xs text-gray-600 font-mono">
                            ENCRYPTION: LEVEL-9
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;
