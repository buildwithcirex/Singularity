'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

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
        <section id="faq" className="py-20 px-6 relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-16 text-center">
                Comms <span className="text-gold-500">Relay</span>
            </h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="w-full border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm"
                    >
                        <button
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                        >
                            <span className="text-xl font-inter font-medium text-white">{faq.question}</span>
                            <ChevronDown
                                className={`w-6 h-6 text-gold-500 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>
                        <AnimatePresence initial={false}>
                            {activeIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <div className="p-6 pt-0 text-gray-400 font-inter border-t border-white/10 break-words">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
