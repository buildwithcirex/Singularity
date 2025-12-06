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
        <section id="about" className="min-h-screen py-20 px-6 flex flex-col items-center justify-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-12 text-center">
                Mission <span className="text-gold-500">Brief</span>
            </h2>
            <div className="max-w-4xl text-center mb-16">
                <TextGenerateEffect words="Singularity is more than a competition; it is a trajectory to excellence. unlike traditional hackathons, we don't just test your skills—we build them. The mission begins with a 12-day engagement, starting with 'Flight Training'—an intensive series of technical workshops to get you mission-ready. This culminates in a high-stakes, 24-hour 'Launch Sequence' , a rigorous environment designed to filter the noise and launch the careers of the next generation of tech pioneers." />
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
