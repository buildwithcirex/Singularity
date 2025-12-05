'use client';

import { motion } from 'framer-motion';
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
        <section id="about" className="min-h-screen py-20 px-6 flex flex-col items-center justify-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-12 text-center">
                Mission <span className="text-gold-500">Brief</span>
            </h2>
            <div className="max-w-4xl text-center mb-16">
                <p className="text-lg md:text-xl font-inter text-gray-300">
                    Singularity is the convergence of space and technology. We invite the brightest minds to build the future of interstellar exploration.
                </p>
            </div>
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
