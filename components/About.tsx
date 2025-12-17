'use client';

import { motion } from 'framer-motion';
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import FlipCard from '@/components/animata/card/flip-card';

const tracks = [
    {
        title: 'Agentic AI',
        description: 'Build autonomous agents that can reason, act, and solve complex problems.',
        icon: '🤖',
    },
    {
        title: 'Open Innovation',
        description: 'Push the boundaries of technology with creative solutions in any domain.',
        icon: '🚀',
    },
];

const About = () => {
    return (
        <section id="mission" className="min-h-screen py-20 px-6 flex flex-col items-center justify-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-12 text-center">
                Mission <span className="text-gold-500">Brief</span>
            </h2>
            
            {/* Tablet Display */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-4xl w-full mb-16 relative"
            >
                {/* Tablet Frame */}
                <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black border-2 border-gold-500/30 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                    {/* Commander Header */}
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gold-500/20">
                        <div className="w-3 h-3 bg-gold-500 rounded-full animate-pulse"></div>
                        <span className="text-gold-500 font-orbitron text-sm uppercase tracking-wider">
                            Transmission from Mission Commander CIREX
                        </span>
                    </div>
                    
                    {/* Message Content */}
                    <div className="text-left space-y-6">
                        <TextGenerateEffect words="Listen up, candidates.

Singularity isn't another hackathon. It's a 12-day mission with one objective: build you into something greater.

PHASE 1: FLIGHT TRAINING
Intensive technical workshops. No theory. Just hard skills. You'll build, build, and build until it's instinct.

PHASE 2: LAUNCH SEQUENCE
24 hours. High stakes. Build under pressure. Build alongside the elite. Build something that matters.

We don't test skills. We build them.

Mission begins soon. Are you ready?" />
                    </div>
                    
                    {/* Bottom Status Bar */}
                    <div className="flex items-center justify-between mt-8 pt-4 border-t border-gold-500/20">
                        <span className="text-xs text-gray-500 font-mono">CLASSIFIED: LEVEL OMEGA</span>
                        <span className="text-xs text-gray-500 font-mono">STATUS: ACTIVE</span>
                    </div>
                </div>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-12 items-center justify-center w-full max-w-6xl">
                <FlipCard
                    image="/track_1.svg"
                    title="Agentic AI"
                    subtitle="Agentic AI Track"
                    description="Build autonomous agents that can reason, act, and solve complex problems. Create systems that go beyond chat to perform real-world tasks."
                    rotate="y"
                />
                <FlipCard
                    image="/track_2.svg"
                    title="Open Innovation"
                    subtitle="Open Innovation"
                    description="Push the boundaries of technology with creative solutions in any domain. Use blockchain, AR/VR, or any other tech stack to build something amazing."
                    rotate="y"
                />
            </div>
        </section>
    );
};

export default About;
